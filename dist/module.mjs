import { createJiti } from "file:///Users/jerryyeh/isbn-scanner/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "isbn-scanner": "/Users/jerryyeh/isbn-scanner"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/Users/jerryyeh/isbn-scanner/src/module.js")} */
const _module = await jiti.import("/Users/jerryyeh/isbn-scanner/src/module.ts");

export default _module?.default ?? _module;