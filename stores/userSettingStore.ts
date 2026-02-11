import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";
import { useIsbnStore } from "./isbnStore";

export const useUserSettingStore = defineStore("settings", () => {
    const addDefault = useLocalStorage("addDefault", false);
    const isbnStore = useIsbnStore();
    watch(
        [addDefault, () => isbnStore.current],
        ([auto, current]) => {
            if (auto && current) {
                isbnStore.addResultToCollection();
            }
        },
        { immediate: true },
    );
    function switchAddDefault() {
        addDefault.value = !addDefault.value;
    }

    return { addDefault, switchAddDefault };
});
