import { defineComponent, createElementBlock, shallowRef, getCurrentInstance, provide, cloneVNode, h, resolveComponent, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import "/Users/jerryyeh/isbn-scanner/node_modules/hookable/dist/index.mjs";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { defineStore } from "pinia";
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useIsbnStore = defineStore("isbn", {
  state: () => ({
    // 用來存放置換結果的陣列
    results: [],
    nextId: 1
  }),
  actions: {
    addResult(isbn) {
      const isDuplicate = this.results.some((item) => item.isbn === isbn);
      if (isDuplicate) {
        console.log("此 ISBN 已存在清單中，不重複加入");
        return;
      }
      this.results.unshift({
        id: this.nextId++,
        isbn,
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString()
      });
    },
    deleteResult(id) {
      this.results = this.results.filter((item) => item.id !== id);
      this.results.forEach((item, index) => {
        item.id = this.results.length - index;
      });
      this.nextId = this.results.length + 1;
      console.log("重排後的結果:", this.results);
    }
  }
  // 如果想要網頁重新整理後資料還在，可以搭配 pinia-plugin-persistedstate
});
const _sfc_main = {
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const isbnStore = useIsbnStore();
    const clearAll = () => {
      if (confirm("確定要清空所有紀錄嗎？")) {
        isbnStore.results = [];
        isbnStore.nextId = 1;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_container = resolveComponent("v-container");
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_list_item_subtitle = resolveComponent("v-list-item-subtitle");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_ClientOnly = __nuxt_component_0;
      const _component_v_avatar = resolveComponent("v-avatar");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_divider = resolveComponent("v-divider");
      _push(ssrRenderComponent(_component_v_container, mergeProps({ class: "h-100 d-flex flex-column" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_toolbar, {
              color: "transparent",
              class: "mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_toolbar_title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_list_item_title, { class: "text-h5 font-weight-bold" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`掃描紀錄`);
                            } else {
                              return [
                                createTextVNode("掃描紀錄")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_v_list_item_subtitle, { class: "text-caption text-grey" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 共 ${ssrInterpolate(unref(isbnStore).results.length)} 筆 `);
                            } else {
                              return [
                                createTextVNode(" 共 " + toDisplayString(unref(isbnStore).results.length) + " 筆 ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_list_item_title, { class: "text-h5 font-weight-bold" }, {
                            default: withCtx(() => [
                              createTextVNode("掃描紀錄")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_v_list_item_subtitle, { class: "text-caption text-grey" }, {
                            default: withCtx(() => [
                              createTextVNode(" 共 " + toDisplayString(unref(isbnStore).results.length) + " 筆 ", 1)
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
                    createVNode(_component_v_toolbar_title, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_list_item_title, { class: "text-h5 font-weight-bold" }, {
                          default: withCtx(() => [
                            createTextVNode("掃描紀錄")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_list_item_subtitle, { class: "text-caption text-grey" }, {
                          default: withCtx(() => [
                            createTextVNode(" 共 " + toDisplayString(unref(isbnStore).results.length) + " 筆 ", 1)
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
            _push2(`<div class="h-100 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_list, {
              lines: "two",
              border: "",
              class: "rounded-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isbnStore).results.length === 0) {
                    _push3(ssrRenderComponent(_component_v_list_item, { class: "text-center py-8" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_v_list_item_title, { class: "text-grey" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`目前沒有紀錄`);
                              } else {
                                return [
                                  createTextVNode("目前沒有紀錄")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_v_list_item_title, { class: "text-grey" }, {
                              default: withCtx(() => [
                                createTextVNode("目前沒有紀錄")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(isbnStore).results, (item, index) => {
                      _push3(`<!--[-->`);
                      _push3(ssrRenderComponent(_component_v_list_item, {
                        title: item.isbn
                      }, {
                        subtitle: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_ClientOnly, null, {}, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_ClientOnly, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.time), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_v_avatar, {
                              color: "primary",
                              variant: "tonal",
                              size: "small"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<span class="text-caption"${_scopeId4}>${ssrInterpolate(item.id)}</span>`);
                                } else {
                                  return [
                                    createVNode("span", { class: "text-caption" }, toDisplayString(item.id), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_v_avatar, {
                                color: "primary",
                                variant: "tonal",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, toDisplayString(item.id), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_v_btn, {
                              icon: "mdi-delete",
                              variant: "text",
                              color: "grey-lighten-1",
                              onClick: ($event) => unref(isbnStore).deleteResult(item.id)
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_v_btn, {
                                icon: "mdi-delete",
                                variant: "text",
                                color: "grey-lighten-1",
                                onClick: ($event) => unref(isbnStore).deleteResult(item.id)
                              }, null, 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (index < unref(isbnStore).results.length - 1) {
                        _push3(ssrRenderComponent(_component_v_divider, { class: "border-opacity-25" }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    unref(isbnStore).results.length === 0 ? (openBlock(), createBlock(_component_v_list_item, {
                      key: 0,
                      class: "text-center py-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_list_item_title, { class: "text-grey" }, {
                          default: withCtx(() => [
                            createTextVNode("目前沒有紀錄")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(isbnStore).results, (item, index) => {
                      return openBlock(), createBlock(Fragment, {
                        key: item.id
                      }, [
                        createVNode(_component_v_list_item, {
                          title: item.isbn
                        }, {
                          subtitle: withCtx(() => [
                            createVNode(_component_ClientOnly, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.time), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          prepend: withCtx(() => [
                            createVNode(_component_v_avatar, {
                              color: "primary",
                              variant: "tonal",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, toDisplayString(item.id), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          append: withCtx(() => [
                            createVNode(_component_v_btn, {
                              icon: "mdi-delete",
                              variant: "text",
                              color: "grey-lighten-1",
                              onClick: ($event) => unref(isbnStore).deleteResult(item.id)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1032, ["title"]),
                        index < unref(isbnStore).results.length - 1 ? (openBlock(), createBlock(_component_v_divider, {
                          key: 0,
                          class: "border-opacity-25"
                        })) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="d-flex ga-5 justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_v_btn, {
              color: "success",
              variant: "tonal",
              "prepend-icon": "mdi-export",
              onClick: () => {
              },
              disabled: unref(isbnStore).results.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 匯出 `);
                } else {
                  return [
                    createTextVNode(" 匯出 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_v_btn, {
              color: "error",
              variant: "tonal",
              "prepend-icon": "mdi-delete-sweep",
              onClick: clearAll,
              disabled: unref(isbnStore).results.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 清空 `);
                } else {
                  return [
                    createTextVNode(" 清空 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_v_toolbar, {
                color: "transparent",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_toolbar_title, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_list_item_title, { class: "text-h5 font-weight-bold" }, {
                        default: withCtx(() => [
                          createTextVNode("掃描紀錄")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_list_item_subtitle, { class: "text-caption text-grey" }, {
                        default: withCtx(() => [
                          createTextVNode(" 共 " + toDisplayString(unref(isbnStore).results.length) + " 筆 ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "h-100 mb-4" }, [
                createVNode(_component_v_list, {
                  lines: "two",
                  border: "",
                  class: "rounded-lg"
                }, {
                  default: withCtx(() => [
                    unref(isbnStore).results.length === 0 ? (openBlock(), createBlock(_component_v_list_item, {
                      key: 0,
                      class: "text-center py-8"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_list_item_title, { class: "text-grey" }, {
                          default: withCtx(() => [
                            createTextVNode("目前沒有紀錄")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(isbnStore).results, (item, index) => {
                      return openBlock(), createBlock(Fragment, {
                        key: item.id
                      }, [
                        createVNode(_component_v_list_item, {
                          title: item.isbn
                        }, {
                          subtitle: withCtx(() => [
                            createVNode(_component_ClientOnly, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.time), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          prepend: withCtx(() => [
                            createVNode(_component_v_avatar, {
                              color: "primary",
                              variant: "tonal",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, toDisplayString(item.id), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          append: withCtx(() => [
                            createVNode(_component_v_btn, {
                              icon: "mdi-delete",
                              variant: "text",
                              color: "grey-lighten-1",
                              onClick: ($event) => unref(isbnStore).deleteResult(item.id)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1032, ["title"]),
                        index < unref(isbnStore).results.length - 1 ? (openBlock(), createBlock(_component_v_divider, {
                          key: 0,
                          class: "border-opacity-25"
                        })) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "d-flex ga-5 justify-center" }, [
                createVNode(_component_v_btn, {
                  color: "success",
                  variant: "tonal",
                  "prepend-icon": "mdi-export",
                  onClick: () => {
                  },
                  disabled: unref(isbnStore).results.length === 0
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 匯出 ")
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"]),
                createVNode(_component_v_btn, {
                  color: "error",
                  variant: "tonal",
                  "prepend-icon": "mdi-delete-sweep",
                  onClick: clearAll,
                  disabled: unref(isbnStore).results.length === 0
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 清空 ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const list = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  _sfc_main as _,
  list as l,
  useIsbnStore as u
};
//# sourceMappingURL=list-CjLJ9DaE.js.map
