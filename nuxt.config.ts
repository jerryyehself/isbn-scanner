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
	routeRules: {
		// 當前端呼叫 /api-gas/** 時，完全移除前綴，直接發送給 GAS 的網址
		'/api-gas/**': {
			proxy: 'https://script.google.com/macros/s/AKfycbyuhAdHl409hos9-Pc_83nFOmPrT_Qt-bs-OvUfPH1ZG1MH7u-zTwu7gr1yf69Nr1og/exec',
		},
	},
});
