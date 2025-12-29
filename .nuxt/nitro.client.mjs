export const useRuntimeConfig = () => 
window?.__NUXT__?.config || window?.useNuxtApp?.().payload?.config