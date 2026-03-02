import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi-svg";
import { aliases } from "vuetify/iconsets/mdi-svg";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: "mdi",
        },
    });
    nuxtApp.vueApp.use(vuetify);
});
