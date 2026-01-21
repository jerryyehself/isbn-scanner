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
    coverSmall?: string;
    pages?: string;
    subjects?: {
        common: string[];
        place: string[];
        time: string[];
        people: string[];
    };
}
interface OpenLibraryEntry {
    title: string;
    authors?: { name: string }[];
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
        scanTimeSpan: new Date().toLocaleTimeString(),
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
        coverSmall: entry.cover?.small,
    };
}

export const useIsbnStore = defineStore("isbn", {
    state: () => ({
        results: [] as CollectionItem[],
        nextId: 1,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async addResultWithFetch(isbn: string) {
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
                const collectionItem = mapToCollectionItem(
                    entry,
                    isbn,
                    this.nextId++,
                );

                this.results.unshift(collectionItem);
            } catch (err) {
                console.error(err);
                this.error = err instanceof Error ? err.message : "Fetch 失敗";
            } finally {
                this.loading = false;
            }
        },

        deleteResult(id: number) {
            this.results = this.results.filter((item) => item.id !== id);
            this.nextId = this.results.length + 1;
        },
    },
});
