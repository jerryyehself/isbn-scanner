
import { defineNuxtPlugin } from '#imports'
import { isDev, vuetifyConfiguration } from 'virtual:vuetify-configuration'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin({
  name: 'vuetify:nuxt:server:plugin',
  order: 25,
  dependsOn: ["vuetify:icons:plugin","vuetify:client-hints:server:plugin"],
  parallel: true,
  async setup(nuxtApp) {
    const vuetifyOptions = vuetifyConfiguration()
    await nuxtApp.hooks.callHook('vuetify:configuration', { isDev, vuetifyOptions })
    await nuxtApp.hooks.callHook('vuetify:before-create', { isDev, vuetifyOptions })
    const vuetify = createVuetify(vuetifyOptions)
    nuxtApp.vueApp.use(vuetify)
    nuxtApp.provide('vuetify', vuetify)
    await nuxtApp.hooks.callHook('vuetify:ready', vuetify)
    if (import.meta.client)
      isDev && console.log('Vuetify 3 initialized', vuetify)
  },
})
