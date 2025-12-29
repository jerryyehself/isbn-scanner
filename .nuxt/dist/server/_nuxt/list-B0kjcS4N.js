import { resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { u as useIsbnStore } from "./isbnStore-47XVRDgQ.js";
import "pinia";
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
      const _component_v_spacer = resolveComponent("v-spacer");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_avatar = resolveComponent("v-avatar");
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
                  _push3(ssrRenderComponent(_component_v_toolbar_title, { class: "text-h5 font-weight-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 掃描紀錄 <span class="text-caption text-grey ml-2"${_scopeId3}>共 ${ssrInterpolate(unref(isbnStore).results.length)} 筆</span>`);
                      } else {
                        return [
                          createTextVNode(" 掃描紀錄 "),
                          createVNode("span", { class: "text-caption text-grey ml-2" }, "共 " + toDisplayString(unref(isbnStore).results.length) + " 筆", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_spacer, null, null, _parent3, _scopeId2));
                  _push3(`<div class="d-flex ga-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_v_btn, {
                    color: "success",
                    variant: "tonal",
                    "prepend-icon": "mdi-export",
                    onClick: () => {
                    },
                    disabled: unref(isbnStore).results.length === 0
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 匯出 `);
                      } else {
                        return [
                          createTextVNode(" 匯出 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_btn, {
                    color: "error",
                    variant: "tonal",
                    "prepend-icon": "mdi-delete-sweep",
                    onClick: clearAll,
                    disabled: unref(isbnStore).results.length === 0
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 清空 `);
                      } else {
                        return [
                          createTextVNode(" 清空 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_v_toolbar_title, { class: "text-h5 font-weight-bold" }, {
                      default: withCtx(() => [
                        createTextVNode(" 掃描紀錄 "),
                        createVNode("span", { class: "text-caption text-grey ml-2" }, "共 " + toDisplayString(unref(isbnStore).results.length) + " 筆", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_spacer),
                    createVNode("div", { class: "d-flex ga-2" }, [
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
            }, _parent2, _scopeId));
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
                        title: item.isbn,
                        subtitle: item.time
                      }, {
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
                          title: item.isbn,
                          subtitle: item.time
                        }, {
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
                        }, 1032, ["title", "subtitle"]),
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
          } else {
            return [
              createVNode(_component_v_toolbar, {
                color: "transparent",
                class: "mb-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_toolbar_title, { class: "text-h5 font-weight-bold" }, {
                    default: withCtx(() => [
                      createTextVNode(" 掃描紀錄 "),
                      createVNode("span", { class: "text-caption text-grey ml-2" }, "共 " + toDisplayString(unref(isbnStore).results.length) + " 筆", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_spacer),
                  createVNode("div", { class: "d-flex ga-2" }, [
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
                ]),
                _: 1
              }),
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
                        title: item.isbn,
                        subtitle: item.time
                      }, {
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
                      }, 1032, ["title", "subtitle"]),
                      index < unref(isbnStore).results.length - 1 ? (openBlock(), createBlock(_component_v_divider, {
                        key: 0,
                        class: "border-opacity-25"
                      })) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=list-B0kjcS4N.js.map
