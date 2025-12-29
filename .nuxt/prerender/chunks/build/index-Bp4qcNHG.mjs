import { ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, createBlock, openBlock, nextTick, useSSRContext } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue/server-renderer/index.mjs';
import { Html5QrcodeScanner } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/html5-qrcode/cjs/index.js';
import isbn from 'file:///Users/jerryyeh/isbn-scanner/node_modules/isbn3/isbn.js';
import { u as useIsbnStore } from './isbnStore-47XVRDgQ.mjs';
import { n as navigateTo } from './server.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/pinia/dist/pinia.prod.cjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/h3/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/destr/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/hookable/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/ohash/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/klona/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/defu/dist/defu.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/scule/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unctx/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/pathe/dist/index.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unhead/dist/server.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/devalue/index.js';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isbnStore = useIsbnStore();
    const isScanning = ref(false);
    let scannerInstance = null;
    const startScan = async () => {
      isScanning.value = true;
      await nextTick();
      scannerInstance = new Html5QrcodeScanner("scanner", {
        fps: 10,
        qrbox: { width: 280, height: 180 }
        // 針對長條形 ISBN 調整
      });
      scannerInstance.render((barcode) => {
        const parsed = isbn.parse(barcode);
        if (parsed) {
          isbnStore.addResult(parsed.isbn13);
          stopScan();
          navigateTo("/list");
        }
      });
    };
    const stopScan = () => {
      if (scannerInstance) {
        scannerInstance.clear();
        scannerInstance = null;
      }
      isScanning.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_container = resolveComponent("v-container");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_chip = resolveComponent("v-chip");
      _push(ssrRenderComponent(_component_v_container, mergeProps({
        class: "d-flex flex-column align-center justify-center",
        style: { "min-height": "70vh" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isScanning.value) {
              _push2(ssrRenderComponent(_component_v_btn, {
                class: "d-flex align-center justify-center flex-column ga-2",
                style: { "width": "20em", "height": "20em", "border": "2px dashed #ccc" },
                variant: "text",
                onClick: startScan
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="d-flex flex-column align-center justify-center w-100 h-100 ga-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_v_icon, {
                      size: "128",
                      color: "primary",
                      icon: "mdi-barcode-scan"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-h6 font-medium"${_scopeId2}>\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "d-flex flex-column align-center justify-center w-100 h-100 ga-4" }, [
                        createVNode(_component_v_icon, {
                          size: "128",
                          color: "primary",
                          icon: "mdi-barcode-scan"
                        }),
                        createVNode("span", { class: "text-h6 font-medium" }, "\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_v_card, {
                class: "w-100",
                "max-width": "500",
                elevation: "4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_v_toolbar, {
                      color: "primary",
                      density: "compact"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_toolbar_title, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u6B63\u5728\u8B80\u53D6\u689D\u78BC...`);
                              } else {
                                return [
                                  createTextVNode("\u6B63\u5728\u8B80\u53D6\u689D\u78BC...")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_v_spacer, null, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_v_btn, {
                            icon: "mdi-close",
                            onClick: stopScan
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_toolbar_title, null, {
                              default: withCtx(() => [
                                createTextVNode("\u6B63\u5728\u8B80\u53D6\u689D\u78BC...")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_spacer),
                            createVNode(_component_v_btn, {
                              icon: "mdi-close",
                              onClick: stopScan
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div id="scanner" class="w-100"${_scopeId2}></div>`);
                    _push3(ssrRenderComponent(_component_v_card_text, { class: "text-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_chip, {
                            "prepend-icon": "mdi-information",
                            variant: "text"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 `);
                              } else {
                                return [
                                  createTextVNode(" \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_chip, {
                              "prepend-icon": "mdi-information",
                              variant: "text"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_v_toolbar, {
                        color: "primary",
                        density: "compact"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_toolbar_title, null, {
                            default: withCtx(() => [
                              createTextVNode("\u6B63\u5728\u8B80\u53D6\u689D\u78BC...")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_spacer),
                          createVNode(_component_v_btn, {
                            icon: "mdi-close",
                            onClick: stopScan
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", {
                        id: "scanner",
                        class: "w-100"
                      }),
                      createVNode(_component_v_card_text, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(_component_v_chip, {
                            "prepend-icon": "mdi-information",
                            variant: "text"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              !isScanning.value ? (openBlock(), createBlock(_component_v_btn, {
                key: 0,
                class: "d-flex align-center justify-center flex-column ga-2",
                style: { "width": "20em", "height": "20em", "border": "2px dashed #ccc" },
                variant: "text",
                onClick: startScan
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex flex-column align-center justify-center w-100 h-100 ga-4" }, [
                    createVNode(_component_v_icon, {
                      size: "128",
                      color: "primary",
                      icon: "mdi-barcode-scan"
                    }),
                    createVNode("span", { class: "text-h6 font-medium" }, "\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN")
                  ])
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_v_card, {
                key: 1,
                class: "w-100",
                "max-width": "500",
                elevation: "4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_toolbar, {
                    color: "primary",
                    density: "compact"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_toolbar_title, null, {
                        default: withCtx(() => [
                          createTextVNode("\u6B63\u5728\u8B80\u53D6\u689D\u78BC...")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_spacer),
                      createVNode(_component_v_btn, {
                        icon: "mdi-close",
                        onClick: stopScan
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    id: "scanner",
                    class: "w-100"
                  }),
                  createVNode(_component_v_card_text, { class: "text-center" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_chip, {
                        "prepend-icon": "mdi-information",
                        variant: "text"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bp4qcNHG.mjs.map
