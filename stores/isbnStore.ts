import { defineStore } from "pinia";
interface CollectionItem {
    id: number;
    scanTimeSpan: string;
    isbn: string;
    title: string;
    authors: string[];
    publishDate?: string;
    publishPlace?: string[];
    publisher?: string;
    covers?: {
        small?: string;
        medium?: string;
        large?: string;
    };
    pages?: string;
    subjects?: {
        common: string[];
        place: string[];
        time: string[];
        people: string[];
    };
    marked: boolean;
    notes: string[];
}
interface OpenLibraryEntry {
    title: string;
    authors?: { name: string }[];
    isbn: string;
    publish_date?: string;
    publishers?: { name: string }[];
    publish_places?: { name: string }[];
    number_of_pages?: number;
    cover?: {
        small: string;
        medium: string;
        large: string;
    };
    subjects?: { name: string; url: string }[];
    subject_places?: { name: string; url: string }[];
    subject_times?: { name: string; url: string }[];
    subject_people?: { name: string; url: string }[];
    notes: string[];
}

function extractOpenLibraryEntry(
    data: unknown,
    isbn: string,
): OpenLibraryEntry {
    if (!data || typeof data !== "object") {
        throw new Error("OpenLibrary API 回傳格式錯誤");
    }

    const record = data as Record<string, unknown>;
    const entry = record[`ISBN:${isbn}`];

    if (!entry || typeof entry !== "object") {
        throw new Error(`找不到 ISBN: ${isbn}`);
    }
    entry.scanTimeSpan = new Date().toLocaleTimeString();
    entry.isbn = isbn;
    entry.notes = [];
    entry.marked = false;
    return entry as OpenLibraryEntry;
}

function mapToCollectionItem(
    entry: OpenLibraryEntry,
    isbn: string,
    id: number,
): CollectionItem {
    return {
        id,
        isbn,
        scanTimeSpan: entry.scanTimeSpan,
        title: entry.title,
        authors: entry.authors?.map((a) => a.name) ?? [],
        publishDate: entry.publish_date,
        publishPlace: entry.publish_places?.map((p) => p.name),
        publisher: entry.publishers?.map((p) => p.name).join(", "),
        pages: entry.number_of_pages
            ? entry.number_of_pages.toString()
            : undefined,
        subjects: {
            common: entry.subjects?.map((s) => s.name) ?? [],
            place: entry.subject_places?.map((s) => s.name) ?? [],
            time: entry.subject_times?.map((s) => s.name) ?? [],
            people: entry.subject_people?.map((s) => s.name) ?? [],
        },
        covers: {
            small: entry.cover?.small,
            medium: entry.cover?.medium,
            large: entry.cover?.large,
        },
        marked: false,
        notes: entry.notes,
    };
}

export const useIsbnStore = defineStore("isbn", {
    state: () => ({
        results: [] as CollectionItem[],
        nextId: 1,
        loading: false,
        error: null as string | null,
        // current: null as OpenLibraryEntry | null,
        currentList: [] as OpenLibraryEntry[],
        snackbar: {
            show: false,
            text: "",
            color: "success",
        },
    }),

    actions: {
        async fetchBookInfo(isbn: string) {
            if (this.results.some((item) => item.isbn === isbn)) {
                console.log("此 ISBN 已存在");
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const raw = await $fetch<unknown>(
                    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
                );

                const entry = extractOpenLibraryEntry(raw, isbn);

                this.currentList.unshift(entry);
                // this.current = entry;
            } catch (err) {
                console.error(err);
                this.error = err instanceof Error ? err.message : "Fetch 失敗";
            } finally {
                this.loading = false;
            }
        },
        addResultToCollection(currentItem: OpenLibraryEntry) {
            // if (!this.current) return;

            const collectionItem = mapToCollectionItem(
                currentItem,
                currentItem.isbn,
                this.nextId++,
            );
            this.results.unshift(collectionItem);
            this.snackbar = {
                show: true,
                text: `已將 ${currentItem.title} 加入清單`,
                color: "success",
            };
            this.currentList = this.currentList.filter(
                (item) => item.isbn !== currentItem.isbn,
            );
        },
        deleteResult(id: number) {
            this.results = this.results.filter((item) => item.id !== id);
            this.nextId = this.results.length + 1;
        },
        deleteCurrentItem(isbn: string) {
            this.currentList = this.currentList.filter(
                (item) => item.isbn !== isbn,
            );
            // this.current = this.currentList.at(0) || null;
        },
    },
    getters: {
        lastResult: (state) => state.results.at(0),
    },
});
