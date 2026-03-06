import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";
import { useUserSettingStore } from "./userSettingStore";

// --- 保持原有的 Interface 定義 ---
interface CollectionItem {
    id: number;
    scanTimeSpan: string;
    isbn: string;
    title: string;
    authors: { name: string }[];
    publishDate?: string;
    publishPlace?: { name: string }[];
    publishers?: { name: string }[];
    cover?: {
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
    scanTimeSpan?: string; // 補上選用屬性以利處理
    marked?: boolean;
}

// --- 保持原有的外部輔助函式 ---
function extractOpenLibraryEntry(
    data: unknown,
    isbn: string,
): OpenLibraryEntry {
    if (!data || typeof data !== "object") {
        throw new Error("OpenLibrary API 回傳格式錯誤");
    }
    const record = data as Record<string, unknown>;
    const entry = record[`ISBN:${isbn}`] as any;

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
        scanTimeSpan: entry.scanTimeSpan || "",
        title: entry.title,
        authors: entry.authors ?? [],
        publishDate: entry.publish_date,
        publishPlace: entry.publish_places ?? [],
        publishers: entry.publishers ?? [],
        pages: entry.number_of_pages
            ? entry.number_of_pages.toString()
            : undefined,
        subjects: {
            common: entry.subjects?.map((s) => s.name) ?? [],
            place: entry.subject_places?.map((s) => s.name) ?? [],
            time: entry.subject_times?.map((s) => s.name) ?? [],
            people: entry.subject_people?.map((s) => s.name) ?? [],
        },
        cover: {
            small: entry.cover?.small,
            medium: entry.cover?.medium,
            large: entry.cover?.large,
        },
        marked: entry.marked ?? false,
        notes: entry.notes || [],
    };
}

// --- 組合式 Store 本體 ---
export const useIsbnStore = defineStore("isbn", () => {
    // 1. State (使用 ref/reactive)
    // 建議將正式收藏 results 與 nextId 放入 LocalStorage
    const results = useLocalStorage<CollectionItem[]>("isbn-results", []);
    const nextId = useLocalStorage("isbn-next-id", 1);

    const loading = ref(false);
    const error = ref<string | null>(null);
    const currentList = ref<OpenLibraryEntry[]>([]);
    const snackbar = ref({
        show: false,
        text: "",
        color: "success",
    });

    const userSettingStore = useUserSettingStore();

    // 2. Getters (使用 computed)
    const lastResult = computed(() => results.value[0]);

    // 3. Actions (使用 function)
    async function fetchBookInfo(isbn: string) {
        if (results.value.some((item) => item.isbn === isbn)) {
            console.log("此 ISBN 已存在");
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            const raw = await $fetch<unknown>(
                `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
            );

            const entry = extractOpenLibraryEntry(raw, isbn);
            // 邏輯直接寫在這裡
            if (userSettingStore.addDefault) {
                addResultToCollection(entry);
            } else {
                currentList.value.unshift(entry);
            }
        } catch (err) {
            console.error(err);
            error.value = err instanceof Error ? err.message : "Fetch 失敗";
        } finally {
            loading.value = false;
        }
    }

    function addResultToCollection(currentItem: OpenLibraryEntry) {
        const collectionItem = mapToCollectionItem(
            currentItem,
            currentItem.isbn,
            nextId.value++,
        );

        results.value.unshift(collectionItem);

        snackbar.value = {
            show: true,
            text: `已將 ${currentItem.title} 加入清單`,
            color: "success",
        };

        currentList.value = currentList.value.filter(
            (item) => item.isbn !== currentItem.isbn,
        );
    }

    function deleteResult(id: number) {
        results.value = results.value.filter((item) => item.id !== id);
        // 保持 ID 唯一性，不建議重設 nextId
    }

    function deleteCurrentItem(isbn: string) {
        currentList.value = currentList.value.filter(
            (item) => item.isbn !== isbn,
        );
    }

    // 最後必須 return 所有要在組件中使用的狀態與方法
    return {
        results,
        nextId,
        loading,
        error,
        currentList,
        snackbar,
        lastResult,
        fetchBookInfo,
        addResultToCollection,
        deleteResult,
        deleteCurrentItem,
    };
});
