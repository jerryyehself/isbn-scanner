<template>
	<v-responsive class="border rounded">
		<v-app :theme="theme">
			<v-app-bar :elevation="1">
				<template v-slot:prepend>
					<v-app-bar-nav-icon
						rounded="0"
						variant="text"
						@click.stop="drawer = !drawer"
					/>
				</template>
				<v-app-bar-title>ISBN Scanner</v-app-bar-title>
				<template v-slot:append>
					<v-btn
						:icon="theme === 'light'
							? 'mdi-weather-sunny'
							: 'mdi-weather-night'
							"
						@click="onClick"
					/>
				</template>
			</v-app-bar>
			<client-only>
				<v-navigation-drawer
					v-model="drawer"
					:location="$vuetify.display.mobile ? 'bottom' : undefined"
					temporary
				>
					<v-list
						:items="pages"
						nav
						item-props
					/>
				</v-navigation-drawer>
			</client-only>
			<v-main class="d-flex flex-column h-100">
				<v-container
					fluid
					class="overflow-hidden pa-0 flex-grow-1"
				>
					<NuxtPage />
				</v-container>
			</v-main>
		</v-app>
	</v-responsive>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useIsbnStore } from '../stores/isbnStore';
import { useUserSettingStore } from '../stores/userSettingStore';

const theme = ref('light');

function onClick() {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
}

const pages = [
	{
		title: 'Scanner',
		value: 'scanner',
		to: '/',
	},
	{
		title: 'Results',
		value: 'results',
		to: '/list',
	},
];

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
	drawer.value = false;
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
