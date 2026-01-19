<template>
	<v-responsive class="border rounded">
		<v-app
			:theme="theme"
			style="height: 100dvh; overflow: hidden"
		>
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
			<v-main
				class="d-flex flex-column overflow-hidden"
				style="flex: 1 1 auto"
			>
				<v-container
					fluid
					class="pa-0 flex-grow-1 fill-height"
				>
					<slot />
				</v-container>
			</v-main>
		</v-app>
	</v-responsive>
</template>

<script setup>
import { ref, watch } from 'vue';

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
	{
		title: 'Export',
		value: 'export',
		to: '/export',
	},
];

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
	drawer.value = false;
});
</script>
<style>
/* 鎖死最外層，禁止全網頁捲動 */
html,
body {
	overflow: hidden !important;
	height: 100% !important;
	width: 100% !important;
	position: fixed;
	/* 這是終極手段，防止手機端意外捲動 */
}

#app {
	height: 100% !important;
	overflow: hidden !important;
}
</style>
