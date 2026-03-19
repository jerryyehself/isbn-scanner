// composables/useExcel.ts
import * as XLSX from 'xlsx';

export const useExcel = () => {
	const isExporting = ref(false);

	const exportData = (data: any[], fileName: string) => {
		isExporting.value = true;
		try {
			const worksheet = XLSX.utils.json_to_sheet(data);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
			XLSX.writeFile(workbook, `${fileName}.xlsx`);
		} catch (error) {
			console.error('匯出失敗:', error);
		} finally {
			isExporting.value = false;
		}
	};

	return {
		exportData,
		isExporting,
	};
};
