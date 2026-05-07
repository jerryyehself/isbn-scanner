export default defineI18nConfig(() => ({
    legacy: false,
    locale: "zh-TW",
    datetimeFormats: {
        "zh-TW": {
            long: {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            },
        },
        "en-US": {
            long: {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            },
        },
    },
}));
