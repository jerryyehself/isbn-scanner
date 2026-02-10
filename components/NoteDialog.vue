<template>
	<v-dialog
		v-model="model"
		width="500"
	>
		<v-form
			ref="exportForm"
			@submit.prevent="submit"
		>
			<v-card :title="book.title">
				<v-card-text>
					<v-textarea
						clearable
						label="註記"
					/>
					<v-btn
						icon="mdi-plus"
						size="small"
						density="comfortable"
						variant="plain"
					/>
				</v-card-text>

				<v-card-actions>
					<v-btn
						text="關閉"
						@click="model = false"
					/>
					<v-spacer />
					<v-btn
						type="submit"
						text="確認"
						color="primary"
					/>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
	<v-snackbar
		:timeout="2000"
		color="success"
		variant="outlined"
	/>
</template>
<script setup>
import { ref } from 'vue';
import { pl } from 'vuetify/locale';

const model = defineModel({ type: Boolean });
const book = defineModel('book', { type: Object });

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
