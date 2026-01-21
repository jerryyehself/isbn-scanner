import { useSSRContext, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, openBlock, nextTick } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderStyle } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue/server-renderer/index.mjs';
import { Html5Qrcode } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/html5-qrcode/cjs/index.js';
import isbn from 'file:///Users/jerryyeh/isbn-scanner/node_modules/isbn3/isbn.js';
import { u as useIsbnStore, _ as _sfc_main$1 } from './list-CjLJ9DaE.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file:///Users/jerryyeh/isbn-scanner/node_modules/pinia/dist/pinia.prod.cjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isbnStore = useIsbnStore();
    const isScanning = ref(false);
    isbnStore.addResult("9789571375673");
    console.log(isbnStore.results);
    isbnStore.results.length > 0;
    let html5QrCode = null;
    const startScan = async () => {
      isScanning.value = true;
      await nextTick();
      html5QrCode = new Html5Qrcode("scanner");
      await html5QrCode.start(
        {
          facingMode: "environment"
          // 後鏡頭
        },
        {
          fps: 10,
          // 強制要求 1:1 或特定的寬高比有助於計算中心點
          aspectRatio: 1,
          qrbox: (vw, vh) => {
            const width = Math.min(vw * 0.8, 300);
            const height = width * 0.4;
            return { width, height };
          },
          disableFlip: true
        },
        (decodedText) => {
          const parsed = isbn.parse(decodedText);
          if (parsed) {
            isbnStore.addResult(parsed.isbn13);
          }
        }
      );
    };
    const stopScan = async () => {
      if (html5QrCode) {
        await html5QrCode.stop();
        await html5QrCode.clear();
        html5QrCode = null;
      }
      isScanning.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_row = resolveComponent("v-row");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_sheet = resolveComponent("v-sheet");
      _push(ssrRenderComponent(_component_v_row, mergeProps({ class: "fill-height ma-0 align-center justify-center bg-grey-lighten-3" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_col, { class: "pa-0 h-100 d-flex flex-column overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "height": "15em" })}" class="d-flex align-center justify-center flex-column ga-2" data-v-08e7d416${_scopeId2}>`);
                  if (!isScanning.value) {
                    _push3(ssrRenderComponent(_component_v_btn, {
                      variant: "text",
                      style: { "width": "100%", "max-width": "360px", "height": "96px", "border": "2px dashed #ccc" },
                      onClick: startScan
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="d-flex flex-column align-center justify-center" data-v-08e7d416${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_icon, {
                            size: "64",
                            color: "primary",
                            icon: "mdi-barcode-scan"
                          }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-h6 font-medium" data-v-08e7d416${_scopeId3}>\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                              createVNode(_component_v_icon, {
                                size: "64",
                                color: "primary",
                                icon: "mdi-barcode-scan"
                              }),
                              createVNode("span", { class: "text-h6 font-medium" }, "\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_v_card, {
                      class: "w-100 h-100 d-flex flex-column",
                      elevation: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_toolbar, {
                            color: "white",
                            density: "compact",
                            style: { "height": "48px", "flex-shrink": "0" }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_spacer, null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_v_btn, {
                                  icon: "mdi-close",
                                  onClick: stopScan
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_v_spacer),
                                  createVNode(_component_v_btn, {
                                    icon: "mdi-close",
                                    onClick: stopScan
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div class="flex-grow-1 overflow-hidden d-flex align-center justify-center bg-black" data-v-08e7d416${_scopeId3}><div id="scanner" class="w-100 h-100" data-v-08e7d416${_scopeId3}></div></div>`);
                          _push4(ssrRenderComponent(_component_v_card_text, { class: "text-center py-1 flex-shrink-0" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_v_chip, {
                                  "prepend-icon": "mdi-information",
                                  variant: "text"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 `);
                                    } else {
                                      return [
                                        createTextVNode(" \u8ACB\u5C07\u66F8\u7C4D\u80CC\u9762\u7684 ISBN \u689D\u78BC\u5C0D\u6E96\u5C0D\u7126\u6846 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_toolbar, {
                              color: "white",
                              density: "compact",
                              style: { "height": "48px", "flex-shrink": "0" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_spacer),
                                createVNode(_component_v_btn, {
                                  icon: "mdi-close",
                                  onClick: stopScan
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex-grow-1 overflow-hidden d-flex align-center justify-center bg-black" }, [
                              createVNode("div", {
                                id: "scanner",
                                class: "w-100 h-100"
                              })
                            ]),
                            createVNode(_component_v_card_text, { class: "text-center py-1 flex-shrink-0" }, {
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
                    }, _parent3, _scopeId2));
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_v_divider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_sheet, { class: "flex-grow-1 d-flex flex-column align-center justify-center bg-surface" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(isbnStore).results.length > 0) {
                          _push4(ssrRenderComponent(_sfc_main$1, null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<div data-v-08e7d416${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_icon, {
                            size: "64",
                            color: "grey-lighten-2",
                            icon: "mdi-book-open-variant"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="text-h6 text-medium-emphasis mt-4 text-center" data-v-08e7d416${_scopeId3}> \u8ACB\u5C07 ISBN \u689D\u78BC\u7F6E\u65BC\u756B\u9762\u4E2D\u592E </div><div class="text-caption text-grey-darken-1 mt-2" data-v-08e7d416${_scopeId3}> \u6383\u63CF\u5B8C\u6210\u5F8C\u5C07\u81EA\u52D5\u986F\u793A\u66F8\u7C4D\u8CC7\u8A0A </div></div>`);
                        }
                      } else {
                        return [
                          unref(isbnStore).results.length > 0 ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode(_component_v_icon, {
                              size: "64",
                              color: "grey-lighten-2",
                              icon: "mdi-book-open-variant"
                            }),
                            createVNode("div", { class: "text-h6 text-medium-emphasis mt-4 text-center" }, " \u8ACB\u5C07 ISBN \u689D\u78BC\u7F6E\u65BC\u756B\u9762\u4E2D\u592E "),
                            createVNode("div", { class: "text-caption text-grey-darken-1 mt-2" }, " \u6383\u63CF\u5B8C\u6210\u5F8C\u5C07\u81EA\u52D5\u986F\u793A\u66F8\u7C4D\u8CC7\u8A0A ")
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", {
                      style: { "height": "15em" },
                      class: "d-flex align-center justify-center flex-column ga-2"
                    }, [
                      !isScanning.value ? (openBlock(), createBlock(_component_v_btn, {
                        key: 0,
                        variant: "text",
                        style: { "width": "100%", "max-width": "360px", "height": "96px", "border": "2px dashed #ccc" },
                        onClick: startScan
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                            createVNode(_component_v_icon, {
                              size: "64",
                              color: "primary",
                              icon: "mdi-barcode-scan"
                            }),
                            createVNode("span", { class: "text-h6 font-medium" }, "\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN")
                          ])
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(_component_v_card, {
                        key: 1,
                        class: "w-100 h-100 d-flex flex-column",
                        elevation: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_toolbar, {
                            color: "white",
                            density: "compact",
                            style: { "height": "48px", "flex-shrink": "0" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_spacer),
                              createVNode(_component_v_btn, {
                                icon: "mdi-close",
                                onClick: stopScan
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex-grow-1 overflow-hidden d-flex align-center justify-center bg-black" }, [
                            createVNode("div", {
                              id: "scanner",
                              class: "w-100 h-100"
                            })
                          ]),
                          createVNode(_component_v_card_text, { class: "text-center py-1 flex-shrink-0" }, {
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
                    ]),
                    createVNode(_component_v_divider),
                    createVNode(_component_v_sheet, { class: "flex-grow-1 d-flex flex-column align-center justify-center bg-surface" }, {
                      default: withCtx(() => [
                        unref(isbnStore).results.length > 0 ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_v_icon, {
                            size: "64",
                            color: "grey-lighten-2",
                            icon: "mdi-book-open-variant"
                          }),
                          createVNode("div", { class: "text-h6 text-medium-emphasis mt-4 text-center" }, " \u8ACB\u5C07 ISBN \u689D\u78BC\u7F6E\u65BC\u756B\u9762\u4E2D\u592E "),
                          createVNode("div", { class: "text-caption text-grey-darken-1 mt-2" }, " \u6383\u63CF\u5B8C\u6210\u5F8C\u5C07\u81EA\u52D5\u986F\u793A\u66F8\u7C4D\u8CC7\u8A0A ")
                        ]))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_col, { class: "pa-0 h-100 d-flex flex-column overflow-hidden" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    style: { "height": "15em" },
                    class: "d-flex align-center justify-center flex-column ga-2"
                  }, [
                    !isScanning.value ? (openBlock(), createBlock(_component_v_btn, {
                      key: 0,
                      variant: "text",
                      style: { "width": "100%", "max-width": "360px", "height": "96px", "border": "2px dashed #ccc" },
                      onClick: startScan
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex flex-column align-center justify-center" }, [
                          createVNode(_component_v_icon, {
                            size: "64",
                            color: "primary",
                            icon: "mdi-barcode-scan"
                          }),
                          createVNode("span", { class: "text-h6 font-medium" }, "\u9EDE\u64CA\u958B\u59CB\u6383\u63CF ISBN")
                        ])
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_v_card, {
                      key: 1,
                      class: "w-100 h-100 d-flex flex-column",
                      elevation: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_toolbar, {
                          color: "white",
                          density: "compact",
                          style: { "height": "48px", "flex-shrink": "0" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_spacer),
                            createVNode(_component_v_btn, {
                              icon: "mdi-close",
                              onClick: stopScan
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex-grow-1 overflow-hidden d-flex align-center justify-center bg-black" }, [
                          createVNode("div", {
                            id: "scanner",
                            class: "w-100 h-100"
                          })
                        ]),
                        createVNode(_component_v_card_text, { class: "text-center py-1 flex-shrink-0" }, {
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
                  ]),
                  createVNode(_component_v_divider),
                  createVNode(_component_v_sheet, { class: "flex-grow-1 d-flex flex-column align-center justify-center bg-surface" }, {
                    default: withCtx(() => [
                      unref(isbnStore).results.length > 0 ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(_component_v_icon, {
                          size: "64",
                          color: "grey-lighten-2",
                          icon: "mdi-book-open-variant"
                        }),
                        createVNode("div", { class: "text-h6 text-medium-emphasis mt-4 text-center" }, " \u8ACB\u5C07 ISBN \u689D\u78BC\u7F6E\u65BC\u756B\u9762\u4E2D\u592E "),
                        createVNode("div", { class: "text-caption text-grey-darken-1 mt-2" }, " \u6383\u63CF\u5B8C\u6210\u5F8C\u5C07\u81EA\u52D5\u986F\u793A\u66F8\u7C4D\u8CC7\u8A0A ")
                      ]))
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08e7d416"]]);

export { index as default };
//# sourceMappingURL=index-NSt_TZaK.mjs.map
