<template>
	<v-dialog
		v-model="model"
		width="500">
		<v-form
			ref="exportForm"
			@submit.prevent="submit">
			<v-card title="請選擇匯出方式">
				<v-card-text>
					<v-radio-group
						v-model="dialog"
						:rules="exportRule">
						<div
							v-for="item in exportList"
							:key="item.value">
							<v-radio
								:label="item.title"
								:value="item.value" />

							<v-expand-transition>
								<div
									v-if="
										dialog === item.value &&
										item.value !== 'local'
									"
									class="ml-6 mt-2">
									<v-text-field
										density="compact"
										:rules="item.rules"
										:label="`請輸入 ${item.sub}`" />
								</div>
							</v-expand-transition>
						</div>
					</v-radio-group>
				</v-card-text>

				<v-card-actions>
					<v-btn
						text="關閉"
						@click="model = false" />
					<v-spacer />
					<v-btn
						type="submit"
						text="確認"
						color="primary" />
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
	<v-snackbar
		:timeout="2000"
		color="success"
		variant="outlined" />
</template>
<script setup>
	import { ref } from 'vue';
	import { useExcel } from '../composables/useExcel';
	import { useGasSync } from '../composables/useGasSync';

	const model = defineModel({ type: Boolean }); // ⭐ Vuetify 3 + Vue3 推薦寫法

	const exportForm = ref();
	const dialog = ref(null);

	const exportRule = [(v) => !!v || '請選擇匯出方式'];
	const isSubmitting = ref(false); // 補上這行定義

	const exportList = [
		{
			title: '匯出到本機',
			value: 'local',
		},
		{
			title: 'Email',
			value: 'email',
			sub: 'Email',
			rules: [
				(v) => !!v || '必填',
				(v) => /.+@.+\..+/.test(v) || '格式錯誤',
			],
		},
		{
			title: 'Google Sheet',
			value: 'google',
			// sub: 'Sheet Key',
			// rules: [(v) => !!v || '必填'],
		},
	];

	const submit = async () => {
		// 1. 先驗證
		const { valid } = await exportForm.value.validate();
		if (!valid) return;

		try {
			// 2. 顯示 Loading 狀態 (給使用者視覺回饋)
			isSubmitting.value = true;

			const excel = useExcel();
			const gas = useGasSync();

			// 3. 關鍵：加上 await，確保匯出完成才關閉視窗
			if (dialog.value === 'local') {
				await excel.exportData();
			} else if (dialog.value === 'email') {
				await gas.execute('email');
			} else if (dialog.value === 'google') {
				await gas.execute('sync');
			}

			// 4. 匯出成功後才關閉視窗
			model.value = false;
		} catch (error) {
			// 5. 如果有錯，這裡會抓到，你可以在這裡用 alert 或 toast 顯示錯誤
			console.error('執行過程中發生錯誤:', error);
			alert('操作失敗，請檢查網路連線');
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
