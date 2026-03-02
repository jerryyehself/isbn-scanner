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

	const model = defineModel({ type: Boolean }); // ⭐ Vuetify 3 + Vue3 推薦寫法

	const exportForm = ref();
	const dialog = ref(null);

	const exportRule = [(v) => !!v || '請選擇匯出方式'];

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
			sub: 'Sheet Key',
			rules: [(v) => !!v || '必填'],
		},
	];

	const submit = async () => {
		const { valid } = await exportForm.value.validate();
		if (!valid) return;

		// TODO: 呼叫匯出 API

		model.value = false; // ⭐ 關閉 dialog
	};
</script>
