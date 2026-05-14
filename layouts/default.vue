<template>
	<v-responsive class="border rounded">
		<v-app :theme="theme">
			<v-app-bar :elevation="1">
				<template v-slot:prepend>
					<v-app-bar-nav-icon
						rounded="0"
						variant="text"
						@click.stop="drawer = !drawer" />
				</template>
				<v-app-bar-title :text="$t('app_name')" />
				<client-only>
					<v-select
						:model-value="$i18n.locale"
						:items="[
							{ title: '繁體中文', value: 'zh-TW' },
							{ title: 'English', value: 'en' },
						]"
						item-title="title"
						item-value="value"
						label="Language"
						density="compact"
						hide-details
						style="max-width: 150px"
						@update:model-value="
							(n) => $router.push(switchLocalePath(n))
						" />
				</client-only>
				<template v-slot:append>
					<v-btn
						:icon="
							theme === 'light'
								? 'mdi-weather-sunny'
								: 'mdi-weather-night'
						"
						@click="onClick" />
				</template>
			</v-app-bar>
			<v-navigation-drawer
				v-model="drawer"
				:location="$vuetify.display.mobile ? 'bottom' : undefined"
				temporary>
				<v-list nav>
					<v-list-item
						v-for="item in pages"
						:key="item.value"
						:to="localePath(item.to)"
						:title="$t('pages.' + item.title)" />
				</v-list>
			</v-navigation-drawer>
			<v-main class="d-flex flex-column h-100">
				<v-container
					fluid
					class="overflow-hidden pa-0 flex-grow-1">
					<NuxtPage />
				</v-container>
			</v-main>
		</v-app>
	</v-responsive>
</template>

<script setup>
	const localePath = useLocalePath();
	const switchLocalePath = useSwitchLocalePath(); // 記得加這一行
	const { locale } = useI18n(); // 如果需要監控當前語系
	const theme = ref('light');

	function onClick() {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
	}

	const pages = [
		{
			title: 'scanner',
			value: 'scanner',
			to: '/',
		},
		{
			title: 'result',
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
