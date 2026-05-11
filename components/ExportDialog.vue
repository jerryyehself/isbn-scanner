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
										:label="
											$t(
												'components.ExportDialog.import_tips',
												{ sub: item.sub },
											)
										" />
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
						:text="$t('components.ExportDialog.confirm')"
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
	const model = defineModel({ type: Boolean });

	const exportForm = ref();
	const dialog = ref(null);

	const exportRule = [
		(v) => !!v || $t('components.ExportDialog.select_export_method_tips'),
	];

	const exportList = computed(() => [
		{
			title: $t('components.ExportDialog.local'),
			value: 'local',
		},
		{
			title: 'Email',
			value: 'email',
			sub: 'Email',
			rules: [
				(v) => !!v || $t('components.ExportDialog.required'),
				(v) =>
					/.+@.+\..+/.test(v) ||
					$t('components.ExportDialog.invalid_email'),
			],
		},
		{
			title: 'Google Sheet',
			value: 'google',
			sub: 'Sheet Key',
			rules: [(v) => !!v || $t('components.ExportDialog.required')],
		},
	]);

	const submit = async () => {
		const { valid } = await exportForm.value.validate();
		if (!valid) return;

		// TODO: 呼叫匯出 API

		model.value = false; // ⭐ 關閉 dialog
	};
</script>
