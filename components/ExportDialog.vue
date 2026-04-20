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
										:label="`請輸入 ${item.sub}`"
										v-model="item.subValue.value" />
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
						color="primary"
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

	const isSubmitting = ref(false); // 補上這行定義
	const submitResult = ref({ status: null, text: null });

	const exportList = {
		local: {
			title: '直接匯出',
			value: 'local',
			action: async () => {
				const excel = useExcel();
				await excel.exportData();
			},
		},
		gs: {
			title: '匯入Google Sheet',
			value: 'gs',
			action: async () => {
				const gas = useGasSync();
				await gas.execute('sync');
			},
		},
		email: {
			title: '寄至Email',
			value: 'email',
			sub: 'Email',
			subValue: email,
			rules: [
				(v) => !!v || '必填',
				(v) => /.+@.+\..+/.test(v) || '格式錯誤',
			],
			action: async () => {
				const gas = useGasSync();
				await gas.execute('email', email.value);
			},
		},
	};

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
