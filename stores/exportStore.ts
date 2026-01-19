import { defineStore } from "pinia";

export const useExportStore = defineStore("export", {
    state: () => ({
        form: {
            fields: [
                { field: "title", title: "題名" },
                { field: "subtitle", title: "副題名" },
                { field: "author", title: "作者" },
                { field: "publisher", title: "出版者" },
                { field: "pubYear", title: "出版年份" },
                { field: "isbn", title: "ISBN" },
            ],
            fileTypes: ["CSV", "EXCEL", "TXT", "JSON"],
        },
        results: {
            fields: [],
            fileType: "",
            googleSheetKey: "",
            email: "",
        },
    }),
    actions: {},
    // 如果想要網頁重新整理後資料還在，可以搭配 pinia-plugin-persistedstate
});
