import { joinRelativeURL } from 'ufo'
import { useRuntimeConfig } from 'nitropack/runtime'
const getAppConfig = () => useRuntimeConfig().app
export const baseURL = () => getAppConfig().baseURL
export const buildAssetsDir = () => getAppConfig().buildAssetsDir
export const buildAssetsURL = (...path) => joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path)
export const publicAssetsURL = (...path) => {
  const appConfig = getAppConfig()
  const publicBase = appConfig.cdnURL || appConfig.baseURL
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase
}
if (import.meta.client) {
  globalThis.__buildAssetsURL = buildAssetsURL
  globalThis.__publicAssetsURL = publicAssetsURL
}