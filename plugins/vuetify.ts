import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi-svg";
import { aliases } from "vuetify/iconsets/mdi-svg";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true, 
        components,
        directives,
        // 2. 關閉內建 devtools 以修復 Safari 的 "null is not an object" 報錯
        devtools: { enabled: false },
        icons: {
            defaultSet: "mdi",
        },
    });

    // 3. 使用 nuxtApp.vueApp 注入 Vuetify
    nuxtApp.vueApp.use(vuetify);
});
