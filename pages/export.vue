<template>
	<v-form class="d-flex flex-column w-100 flex-grow-1 overflow-y-auto pa-4 h-100">
		<div class="mb-6">
			<div class="text-subtitle-1 font-weight-medium mb-1">
				匯出設定
			</div>
			<v-text-field
				label="Email 地址"
				clearable
				v-model="exportStore.results.email"
			></v-text-field>
			<v-text-field
				label="google sheet金鑰"
				clearable
				v-model="exportStore.results.googleSheetKey"
			></v-text-field>

			<v-select
				label="檔案類型"
				clearable
				:items="exportStore.form.fileTypes"
				v-model="exportStore.results.fileType"
			></v-select>
			<v-divider></v-divider>
		</div>
		<div class="mb-6">
			<div class="text-subtitle-1 font-weight-medium mb-1">
				匯出欄位
			</div>
			<v-chip-group
				selected-class="text-primary"
				v-model="exportStore.results.fields"
				column
				multiple
			>
				<v-chip
					v-for="tag in exportStore.form.fields"
					:key="tag.field"
					:text="tag.title"
					filter
					:value="tag.field"
				></v-chip>
			</v-chip-group>
		</div>
	</v-form>
</template>

<script setup>
import { useExportStore } from '@/stores/exportStore';

const exportStore = useExportStore();


</script>
<style scoped></style>
