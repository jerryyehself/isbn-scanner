import { defineAsyncComponent } from 'vue'
export default {
  default: defineAsyncComponent(() => import("/Users/jerryyeh/isbn-scanner/layouts/default.vue").then(m => m.default || m))
}