// import zh from './locales/zh-TW.json';
// import en from './locales/en-US.json';

export default defineI18nConfig(() => ({
	legacy: false,
	globalInjection: true, // 👈 強制注入全域變數
	fallbackLocale: 'zh-TW',
	locale: 'zh-TW',
	datetimeFormats: {
		'zh-TW': {
			// 這裡必須跟 nuxt.config.ts 的 code 一模一樣
			long: {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			},
		},
		en: {
			long: {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			},
		},
	},
}));
