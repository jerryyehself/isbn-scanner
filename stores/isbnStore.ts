import { defineStore } from "pinia";
interface Work {
    id: number;
    scanTimeSpan: string;
    isbn: string;
    title: string;
    authorNames: string[];
    publishDate?: string;
    publisherNames?: string[];
    coverSmall?: string;
}

interface OpenLibraryEntry {
    title: string;
    authors?: { name: string }[];
    publish_date?: string;
    publishers?: { name: string }[];
    cover?: {
        small: string;
        medium: string;
        large: string;
    };
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

function mapToWork(entry: OpenLibraryEntry, isbn: string, id: number): Work {
    return {
        id,
        isbn,
        time: new Date().toLocaleTimeString(),

        title: entry.title,
        authorNames: entry.authors?.map((a) => a.name) ?? [],
        publishDate: entry.publish_date,
        publisherNames: entry.publishers?.map((p) => p.name),
        coverSmall: entry.cover?.small,
    };
}

export const useIsbnStore = defineStore("isbn", {
    state: () => ({
        results: [] as Work[],
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
                const work = mapToWork(entry, isbn, this.nextId++);

                this.results.unshift(work);
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
