<template>
	<v-dialog
		v-model="model"
		width="500">
		<v-form
			ref="exportForm"
			@submit.prevent="submit">
			<v-card :title="$t('components.ExportDialog.export_options')">
				<v-card-text>
					<v-radio-group
						v-model="dialog"
						:rules="[(v) => !!v || '請選擇匯出方式']">
						<div
							v-for="item in exportList"
							:key="item.value">
							<v-radio
								:label="item.title"
								:value="item.value" />

							<v-expand-transition>
								<div
									v-if="item.sub && dialog === item.value"
									class="ml-6 mt-2">
									<v-text-field
										density="compact"
										:rules="item.rules"
										:label="
											$t(
												'components.ExportDialog.import_tips',
												{ sub: item.sub },
											)
										"
										v-model="item.subValue.value" />
								</div>
							</v-expand-transition>
						</div>
					</v-radio-group>
				</v-card-text>

				<v-card-actions>
					<v-btn
						:text="$t('components.ExportDialog.close')"
						@click="model = false" />
					<v-spacer />
					<v-btn
						type="submit"
            color="primary"
						:text="$t('components.ExportDialog.confirm')"
						:loading="isSubmitting"
						:disabled="isSubmitting" />
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
	<v-snackbar
		:timeout="2000"
		:text="submitResult.text"
		:color="submitResult.status === true ? 'success' : 'error'"
		v-model="submitResult.status" />
</template>
<script setup>
	import { ref } from 'vue';
	import { useExcel } from '../composables/useExcel';
	import { useGasSync } from '../composables/useGasSync';

	const model = defineModel({ type: Boolean }); // ⭐ Vuetify 3 + Vue3 推薦寫法

	const exportForm = ref();
	const dialog = ref(null);
	const email = ref(null); // 如果需要綁定 email 輸入框，這裡也要定義一個 ref 來接收值

	const exportRule = [
		(v) => !!v || $t('components.ExportDialog.select_export_method_tips'),
	];
  const isSubmitting = ref(false); // 補上這行定義
	const submitResult = ref({ status: null, text: null });
	const exportList = computed(() => [
		{
			title: $t('components.ExportDialog.local'),
			value: 'local',
			action: async () => {
				const excel = useExcel();
				await excel.exportData();
			},
		},
		{
			title: '匯入Google Sheet',
			value: 'gs',
			action: async () => {
				const gas = useGasSync();
				await gas.execute('sync');
			},
		},
		{
			title: 'Email',
			value: 'email',
			sub: 'Email',
			subValue: email,
			rules: [
				(v) => !!v || $t('components.ExportDialog.required'),
				(v) =>
					/.+@.+\..+/.test(v) ||
					$t('components.ExportDialog.invalid_email'),
			],
			action: async () => {
				const gas = useGasSync();
				await gas.execute('email', email.value);
			},
		},
		{
			title: 'Google Sheet',
			value: 'google',
			sub: 'Sheet Key',
			rules: [(v) => !!v || $t('components.ExportDialog.required')],
		},
	]);

	const submit = async () => {
		// 1. 先驗證
		const { valid } = await exportForm.value.validate();
		if (!valid) return;

		try {
			// 2. 顯示 Loading 狀態 (給使用者視覺回饋)
			isSubmitting.value = true;

			console.log(exportList[dialog.value]);
			exportList[dialog.value].action(); // 這裡改成呼叫對應的 action 方法，裡面已經包含了具體的匯出邏輯

			submitResult.value = {
				status: true,
				text: exportList[dialog.value].title + '成功',
			};

			model.value = false;
		} catch (error) {
			console.error('執行過程中發生錯誤:', error);
			submitResult.value = {
				status: false,
				text: '匯出失敗，請稍後再試',
			};
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
