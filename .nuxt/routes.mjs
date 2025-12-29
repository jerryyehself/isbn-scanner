
if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    const router = import.meta.hot.data.router
    const generateRoutes = import.meta.hot.data.generateRoutes
    if (!router || !generateRoutes) {
      import.meta.hot.invalidate('[nuxt] Cannot replace routes because there is no active router. Reloading.')
      return
    }
    router.clearRoutes()
    const routes = generateRoutes(mod.default || mod)
    function addRoutes (routes) {
      for (const route of routes) {
        router.addRoute(route)
      }
      router.replace(router.currentRoute.value.fullPath)
    }
    if (routes && 'then' in routes) {
      routes.then(addRoutes)
    } else {
      addRoutes(routes)
    }
  })
}

export function handleHotUpdate(_router, _generateRoutes) {
  if (import.meta.hot) {
    import.meta.hot.data ||= {}
    import.meta.hot.data.router = _router
    import.meta.hot.data.generateRoutes = _generateRoutes
  }
}
import { default as indexBZVr33iCaSRoLQZnO0Hi2KMRcwJNcECHX8ibKyBRFtoMeta } from "/Users/jerryyeh/isbn-scanner/pages/index.vue?macro=true";
export default [
  {
    name: "index",
    path: "/",
    component: () => import("/Users/jerryyeh/isbn-scanner/pages/index.vue")
  }
]