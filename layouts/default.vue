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
</script>
