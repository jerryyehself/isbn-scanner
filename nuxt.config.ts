import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    css: ["vuetify/styles"],

    build: {
        transpile: ["vuetify"],
    },

    vite: {
        define: {
            "process.env.DEBUG": false,
        },
        plugins: [basicSsl()],
    },

    devServer: {
        https: true,
        host: "0.0.0.0", // 允許外網（手機）連線
        port: 3000, // Nuxt 預設是 3000
    },

    app: {
        baseURL: "/isbn-scanner/",
    },

    nitro: {
        preset: "static",
    },

    modules: ["@nuxtjs/i18n"],
    i18n: {
        locales: [
            {
                code: "zh-TW",
                iso: "zh-TW", // 加上這個
                name: "繁體中文",
                file: "zh-TW.json",
            },
            {
                code: "en",
                iso: "en-US", // 加上這個
                name: "English",
                file: "en-US.json",
            },
        ],
        defaultLocale: "zh-TW",
        detectBrowserLanguage: {
            useCookie: true,
            fallbackLocale: "zh-TW", // 務必指定 fallback，找不到 zh 就用 zh-TW
            alwaysRedirect: false,
        },
        langDir: "locales",
        strategy: "no_prefix", // 如果不需要在網址加上 /en，選這個
        vueI18n: "i18n.config.ts",
        bundle: {
            fullInstall: true,
        },
        experimental: {
            localeDetector: "", // 保持預設或空白
        },
    },
});
