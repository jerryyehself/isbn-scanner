import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";
import { useIsbnStore } from "./isbnStore";

export const useUserSettingStore = defineStore("settings", () => {
    const addDefault = useLocalStorage("addDefault", false);
    const isbnStore = useIsbnStore();
    watch(
        [addDefault, () => isbnStore.currentList],
        ([auto, currentList]) => {
            console.log("addDefault:", auto, "currentList:", currentList);
            if (auto && currentList.length > 0) {
                currentList.forEach((item) =>
                    isbnStore.addResultToCollection(item),
                );
            }
        },
        { immediate: true },
    );
    function switchAddDefault() {
        addDefault.value = !addDefault.value;
    }

    return { addDefault, switchAddDefault };
});
