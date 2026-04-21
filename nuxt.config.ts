import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	css: ['vuetify/styles'],

	build: {
		transpile: ['vuetify'],
	},

	vite: {
		define: {
			'process.env.DEBUG': false,
		},
		plugins: [basicSsl()],
	},

	devServer: {
		https: true,
		host: '0.0.0.0', // 允許外網（手機）連線
		port: 3000, // Nuxt 預設是 3000
	},

	app: {
		baseURL: '/isbn-scanner/',
	},

	nitro: {
		preset: 'static',
	},

	modules: ['@nuxtjs/i18n'],
	i18n: {
		locales: [
			{ code: 'zh-TW', file: 'zh-TW.json', name: '繁體中文' },
			{ code: 'en', file: 'en-US.json', name: 'English' },
		],
		lazy: true, // 延遲載入語系檔，優化效能
		langDir: '../locales',
		defaultLocale: 'zh-TW',
		strategy: 'no_prefix', // 如果不需要在網址加上 /en，選這個
	},
});
