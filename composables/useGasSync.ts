import { useDataFormatter } from './useExportData';

// composables/useGasSync.ts
export const useGasSync = () => {
	const isPending = ref(false);
	const error = ref<string | null>(null);

	// 這裡存放你的 GAS 部署網址 (.../exec)
	const GAS_URL =
		'/api-gas/macros/s/AKfycbykCqy1LQMaVcWMGl-6S6ztu_BRpB2ec8ynQ1uBWD-ErOANfj3PMKN50AMJUDIUugbF/exec';

	const execute = async (
		action: 'sync' | 'email' | 'both',
		email?: string,
	) => {
		isPending.value = true;
		error.value = null;

		try {
			// 建議透過 Nuxt Server API 轉發以避免 CORS 問題，或是直接 fetch
			const response = await $fetch('/api-gas/exec', {
				method: 'POST',
				// GAS 的 doPost 接收的是字串，需確保格式正確
				body: {
					action,
					data: {
						books: await useDataFormatter().formatDataForExport(),
						headers: useDataFormatter().getExportHeaders(),
					},
					email: email || '',
				},
				// 讓瀏覽器處理轉址
				redirect: 'follow',
			});

			return response;
		} catch (err: any) {
			error.value = err.message || '同步失敗';
			throw err;
		} finally {
			isPending.value = false;
		}
	};

	return {
		execute,
		isPending,
		error,
	};
};
