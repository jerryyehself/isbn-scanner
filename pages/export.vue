<template>
	<div class="d-flex flex-column h-100 w-100">
		<v-tabs
			v-model="tab"
			color="primary"
			align-tabs="start"
		>
			<v-tab
				v-for="setting in settings"
				:key="setting.value"
				:value="setting.value"
			>
				{{ setting.title }}
			</v-tab>
		</v-tabs>

		<v-divider></v-divider>

		<div class="flex-grow-1 overflow-y-auto">
			<v-item-group
				v-if="tab == 'source'"
				v-model="selected"
				class="d-flex ga-5 flex-column pa-4 w-100"
			>
				<v-item
					v-for="source in sources"
					:key="source.value"
					:value="source.value"
				>
					<template #default="{ isSelected, toggle }">
						<v-card
							:ripple="!isSelected"
							:variant="isSelected ? 'outlined' : 'elevated'"
							:elevation="isSelected ? 0 : 2"
							@click="!isSelected ? toggle() : null"
							:class="[
								'pa-4 w-100 transition-all',
								isSelected ? 'locked-card' : 'cursor-pointer',
							]"
						>
							<v-card-title class="pa-0 font-weight-bold">
								{{ source.title }}
							</v-card-title>

							<v-expand-transition>
								<div
									v-if="isSelected"
									class="mt-4 d-flex flex-column ga-4"
									@click.stop
								>
									<v-combobox
										v-model="fileTypeSelected"
										:items="source.params.fileType"
										label="檔案類型"
										variant="outlined"
										density="compact"
									/>
									<v-combobox
										v-model="attributesSelected"
										:items="source.params.attributes"
										label="匯出欄位"
										variant="outlined"
										density="compact"
										chips
										multiple
									/>
								</div>
							</v-expand-transition>
						</v-card>
					</template>
				</v-item>
			</v-item-group>

			<div
				v-else-if="tab == 'export'"
				class="pa-4"
			>
				這裡是匯出方式的設定內容...
			</div>
			<div
				v-else-if="tab == 'field'"
				class="pa-4"
			>
				<v-chip-group
					selected-class="text-primary"
					v-model="attributesSelected"
					multiple
				>
					<v-chip
						v-for="tag in tags"
						:key="tag.field"
						:text="tag.title"
						filter
						:value="tag.field"
					></v-chip>
				</v-chip-group>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, shallowRef } from 'vue';

const tab = ref('source');
const selected = ref(null);
const fileTypeSelected = ref([]);
const attributesSelected = ref([]);
const settings = [
	// { title: '資料來源', value: 'source' },
	{ title: '匯出方式', value: 'export' },
	{ title: '匯出內容', value: 'field' },
];
const sources = [
	{
		title: '臺灣書目整合查詢系統',
		value: 'ncl',
		to: '/',
		params: {
			fileType: ['csv', 'xlsx'],
			attributes: [
				'title',
				'subtitle',
				'author',
				'publisher',
				'pubYear',
				'isbn',
			],
		},
	},
	{
		title: '全國圖書書目資訊網',
		value: 'nbinet',
		to: '/list',
		params: {
			fileType: ['csv', 'xlsx'],
			attributes: [
				'title',
				'subtitle',
				'author',
				'publisher',
				'pubYear',
				'isbn',
			],
		},
	},
];
const tags = [
	{ field: 'title', title: '題名' },
	{ field: 'subtitle', title: '副題名' },
	{ field: 'author', title: '作者' },
	{ field: 'publisher', title: '出版者' },
	{ field: 'pubYear', title: '出版年份' },
	{ field: 'isbn', title: 'ISBN' },
];
</script>
<style scoped>
/* 1. 強制讓套件產生的 video 填滿容器並保持置中 */
#scanner :deep(video) {
	width: 100% !important;
	height: 100% !important;
	object-fit: cover;
	/* 讓相機畫面填滿整個區域，不留黑邊 */
}

/* 2. 處理套件產生的中間層容器 (通常是個 div) */
#scanner :deep(div) {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

/* 3. 修正對焦框 (qrbox) 的位置 */
#scanner :deep(canvas) {
	position: absolute;
	top: 50% !important;
	left: 50% !important;
	transform: translate(-50%, -50%) !important;
}
</style>
