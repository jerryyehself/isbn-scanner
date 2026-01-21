<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
// (可選) 這裡可以放置全局的 SEO 標籤、網站標題等
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - 您的網站名稱` : 'ISBN Scanner for library';
	},
});
</script>
<style>
html,
body,
#__nuxt {
	height: 100%;
	overflow: hidden;
}
</style>