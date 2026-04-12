import { useIsbnStore } from '../stores/isbnStore';

// composables/useGasSync.ts
export const useGasSync = () => {
	const isPending = ref(false);
	const error = ref<string | null>(null);
	const books = useIsbnStore().results;

	// 這裡存放你的 GAS 部署網址 (.../exec)
	const GAS_URL =
		'https://script.google.com/macros/s/AKfycby2iJko8NzIqD-LesmtHTlyJZtYOZmcjPqNlZBz1FJbf_pEyCvJpXD2BQC_S2OfTlFZ/exec';

	const execute = async (
		action: 'sync' | 'email' | 'both',
		email?: string,
	) => {
		isPending.value = true;
		error.value = null;

		try {
			// 建議透過 Nuxt Server API 轉發以避免 CORS 問題，或是直接 fetch
			const response = await $fetch(GAS_URL, {
				method: 'POST',
				// GAS 的 doPost 接收的是字串，需確保格式正確
				body: {
					action,
					books,
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
