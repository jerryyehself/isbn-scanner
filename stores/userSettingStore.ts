import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";
import { useIsbnStore } from "./isbnStore";

export const useUserSettingStore = defineStore("settings", () => {
    const addDefault = useLocalStorage("addDefault", false);
    const resultViewMode = useLocalStorage("resultViewMode", "list");

    function switchAddDefault() {
        addDefault.value = !addDefault.value;
    }

    function toggleViewMode() {
        resultViewMode.value =
            resultViewMode.value === "list" ? "grid" : "list";
    }

    return { addDefault, switchAddDefault, resultViewMode };
});
