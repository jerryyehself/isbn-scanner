<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useIsbnStore } from './stores/isbnStore';
import { useUserSettingStore } from './stores/userSettingStore';
import { useHead } from 'nuxt/app';

// (可選) 這裡可以放置全局的 SEO 標籤、網站標題等
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - 您的網站名稱` : 'ISBN Scanner for library';
	},
});

const isbnStore = useIsbnStore();
const userSettingStore = useUserSettingStore();
watch(
	[() => userSettingStore.addDefault, () => isbnStore.currentList],
	([auto, currentList]) => {
		if (!auto || currentList.length === 0) return;

		currentList.forEach((item) => {
			// 檢查這本書是否已經在 results 裡
			if (!isbnStore.results.some(r => r.isbn === item.isbn)) {
				isbnStore.addResultToCollection(item);
			}
		});
	},
	{ immediate: true, deep: true } // deep 確保陣列內元素改變也會觸發
);
</script>
<style>
html,
body,
#__nuxt {
	height: 100%;
	overflow: hidden;
}
</style>