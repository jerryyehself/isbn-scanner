export default defineNuxtConfig({
	css: ['vuetify/styles'],
	build: {
		transpile: ['vuetify'],
	},
	vite: {
		define: {
			'process.env.DEBUG': false,
		},
	},
	app: {
		baseURL: '/isbn-scanner/',
	},
});
