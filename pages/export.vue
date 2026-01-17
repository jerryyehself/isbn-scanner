<template>
	<v-item-group
		v-model="selected"
		mandatory
		class="d-flex ga-5 flex-column justify-center align-center pa-4 h-100 w-100">
		<v-item
			v-for="source in sources"
			:key="source.value"
			:value="source.value">
			<template #default="{ isSelected, toggle }">
				<v-card
					@click="toggle"
					:elevation="isSelected ? 8 : 2"
					:color="isSelected ? 'gray' : undefined"
					class="pa-4 w-100">
					<v-card-title>{{ source.title }}</v-card-title>
					<div v-if="selected == source.value">
						<!-- <v-treeview
							v-model:opened="open"
							:items="params"
							density="compact"
							item-value="title"
							activatable
							open-on-click>
						</v-treeview> -->
						<v-combobox
							v-model="fileTypeSelected"
							:items="source.params.fileType"
							label="檔案類型"
							chips
							multiple></v-combobox>
						<v-combobox
							v-model="attributesSelected"
							:items="source.params.attributes"
							label="輸出欄位"
							chips
							multiple></v-combobox>
					</div>
				</v-card>
			</template>
		</v-item>
	</v-item-group>
</template>

<script setup>
	import { ref, nextTick, shallowRef } from 'vue';

	const open = shallowRef([]);

	const selected = ref(null);
	const fileTypeSelected = ref([]);
	const attributesSelected = ref([]);
	const params = [
		{
			title: 'type',
		},
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
	const items = [
		{
			title: '.git',
		},
		{
			title: 'node_modules',
		},
		{
			title: 'public',
			children: [
				{
					title: 'static',
					children: [
						{
							title: 'logo.png',
							file: 'png',
						},
					],
				},
				{
					title: 'favicon.ico',
					file: 'png',
				},
				{
					title: 'index.html',
					file: 'html',
				},
			],
		},
		{
			title: '.gitignore',
			file: 'txt',
		},
		{
			title: 'babel.config.js',
			file: 'js',
		},
		{
			title: 'package.json',
			file: 'json',
		},
		{
			title: 'README.md',
			file: 'md',
		},
		{
			title: 'vue.config.js',
			file: 'js',
		},
		{
			title: 'yarn.lock',
			file: 'txt',
		},
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
