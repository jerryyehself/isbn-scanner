import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineNuxtConfig({
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
});
