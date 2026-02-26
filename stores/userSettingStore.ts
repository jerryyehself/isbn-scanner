import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";
import { useIsbnStore } from "./isbnStore";

export const useUserSettingStore = defineStore("settings", () => {
    const addDefault = useLocalStorage("addDefault", false);

    function switchAddDefault() {
        addDefault.value = !addDefault.value;
    }

    return { addDefault, switchAddDefault };
});
