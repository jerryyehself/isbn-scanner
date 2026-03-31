// composables/useExcel.ts
import ExcelJS from "exceljs";
import { ref } from "vue";
import { useIsbnStore } from "../stores/isbnStore";

export const useExcel = () => {
    const isExporting = ref(false);

    const exportData = async () => {
        isExporting.value = true;
        try {
            const isbnStore = useIsbnStore();

            // 1. 建立活頁簿與工作表
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("掃描匯出");

            // 2. 定義欄位 (這會自動生成表頭)
            worksheet.columns = [
                { header: "ID", key: "id", width: 8 },
                { header: "書名", key: "title", width: 35 },
                { header: "作者", key: "author", width: 25 },
                { header: "ISBN", key: "isbn", width: 20 },
                { header: "出版年", key: "publishYear", width: 12 },
                { header: "出版社", key: "publisher", width: 25 },
                { header: "頁數", key: "pages", width: 10 },
                { header: "標記", key: "marked", width: 8 },
                { header: "備註", key: "notes", width: 30 },
            ];

            // 3. 準備資料列
            const rows = isbnStore.results.map((item) => ({
                id: item.id,
                title: item.title,
                author: Array.isArray(item.authors)
                    ? item.authors.map((a) => a.name).join(", ")
                    : item.authors || "",
                isbn: item.isbn,
                publishYear: item.publishDate || "",
                publisher: item.publishers?.map((p) => p.name).join(", ") || "",
                pages: item.pages || "",
                marked: item.marked ? "V" : "",
                notes: item.notes || "",
            }));

            // 4. 加入資料
            worksheet.addRows(rows);

            // 5. 樣式設定：表頭粗體 + 淺灰背景
            const headerRow = worksheet.getRow(1);
            headerRow.font = { bold: true, size: 12 };
            headerRow.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFE0E0E0" },
            };

            // 6. 全域樣式：垂直置中 + 自動換行 (高度自適應)
            worksheet.eachRow((row) => {
                row.alignment = {
                    vertical: "middle",
                    wrapText: true,
                    horizontal: "left",
                };
            });

            // 7. 生成日期檔名 (260331_164538)
            const now = new Date();
            const f = (v: number) => v.toString().padStart(2, "0");
            const timeStamp = `${now.getFullYear().toString().slice(-2)}${f(now.getMonth() + 1)}${f(now.getDate())}_${f(now.getHours())}${f(now.getMinutes())}${f(now.getSeconds())}`;
            const finalFileName = `isbn_scanner_${timeStamp}.xlsx`;

            // 8. 瀏覽器下載
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = finalFileName;
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("匯出失敗:", error);
        } finally {
            isExporting.value = false;
        }
    };

    return {
        exportData,
        isExporting,
    };
};
