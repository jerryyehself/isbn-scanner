import { ref, watch, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, renderSlot, useSSRContext } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderSlot } from 'file:///Users/jerryyeh/isbn-scanner/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = ref("light");
    function onClick() {
      theme.value = theme.value === "light" ? "dark" : "light";
    }
    const pages = [
      {
        title: "Scanner",
        value: "scanner",
        to: "/"
      },
      {
        title: "Results",
        value: "results",
        to: "/list"
      }
    ];
    const drawer = ref(false);
    const group = ref(null);
    watch(group, () => {
      drawer.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_responsive = resolveComponent("v-responsive");
      const _component_v_app = resolveComponent("v-app");
      const _component_v_app_bar = resolveComponent("v-app-bar");
      const _component_v_app_bar_nav_icon = resolveComponent("v-app-bar-nav-icon");
      const _component_v_app_bar_title = resolveComponent("v-app-bar-title");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_container = resolveComponent("v-container");
      _push(ssrRenderComponent(_component_v_responsive, mergeProps({ class: "border rounded" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_app, { theme: theme.value }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_v_app_bar, { elevation: 1 }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_app_bar_nav_icon, {
                          rounded: "0",
                          variant: "text",
                          onClick: ($event) => drawer.value = !drawer.value
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_app_bar_nav_icon, {
                            rounded: "0",
                            variant: "text",
                            onClick: withModifiers(($event) => drawer.value = !drawer.value, ["stop"])
                          }, null, 8, ["onClick"])
                        ];
                      }
                    }),
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_btn, {
                          icon: theme.value === "light" ? "mdi-weather-sunny" : "mdi-weather-night",
                          onClick
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_btn, {
                            icon: theme.value === "light" ? "mdi-weather-sunny" : "mdi-weather-night",
                            onClick
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_app_bar_title, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ISBN Scanner`);
                            } else {
                              return [
                                createTextVNode("ISBN Scanner")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_app_bar_title, null, {
                            default: withCtx(() => [
                              createTextVNode("ISBN Scanner")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_navigation_drawer, {
                    modelValue: drawer.value,
                    "onUpdate:modelValue": ($event) => drawer.value = $event,
                    location: _ctx.$vuetify.display.mobile ? "bottom" : void 0,
                    temporary: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_list, {
                          items: pages,
                          nav: "",
                          "item-props": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_list, {
                            items: pages,
                            nav: "",
                            "item-props": ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_v_main, { class: "d-flex flex-column overflow-hidden" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_v_container, {
                          fluid: "",
                          class: "pa-0 flex-grow-1 fill-height"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "default")
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_v_container, {
                            fluid: "",
                            class: "pa-0 flex-grow-1 fill-height"
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "default")
                            ]),
                            _: 3
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_v_app_bar, { elevation: 1 }, {
                      prepend: withCtx(() => [
                        createVNode(_component_v_app_bar_nav_icon, {
                          rounded: "0",
                          variant: "text",
                          onClick: withModifiers(($event) => drawer.value = !drawer.value, ["stop"])
                        }, null, 8, ["onClick"])
                      ]),
                      append: withCtx(() => [
                        createVNode(_component_v_btn, {
                          icon: theme.value === "light" ? "mdi-weather-sunny" : "mdi-weather-night",
                          onClick
                        }, null, 8, ["icon"])
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_v_app_bar_title, null, {
                          default: withCtx(() => [
                            createTextVNode("ISBN Scanner")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_navigation_drawer, {
                      modelValue: drawer.value,
                      "onUpdate:modelValue": ($event) => drawer.value = $event,
                      location: _ctx.$vuetify.display.mobile ? "bottom" : void 0,
                      temporary: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_list, {
                          items: pages,
                          nav: "",
                          "item-props": ""
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "location"]),
                    createVNode(_component_v_main, { class: "d-flex flex-column overflow-hidden" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_container, {
                          fluid: "",
                          class: "pa-0 flex-grow-1 fill-height"
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 3
                        })
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_v_app, { theme: theme.value }, {
                default: withCtx(() => [
                  createVNode(_component_v_app_bar, { elevation: 1 }, {
                    prepend: withCtx(() => [
                      createVNode(_component_v_app_bar_nav_icon, {
                        rounded: "0",
                        variant: "text",
                        onClick: withModifiers(($event) => drawer.value = !drawer.value, ["stop"])
                      }, null, 8, ["onClick"])
                    ]),
                    append: withCtx(() => [
                      createVNode(_component_v_btn, {
                        icon: theme.value === "light" ? "mdi-weather-sunny" : "mdi-weather-night",
                        onClick
                      }, null, 8, ["icon"])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_v_app_bar_title, null, {
                        default: withCtx(() => [
                          createTextVNode("ISBN Scanner")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_navigation_drawer, {
                    modelValue: drawer.value,
                    "onUpdate:modelValue": ($event) => drawer.value = $event,
                    location: _ctx.$vuetify.display.mobile ? "bottom" : void 0,
                    temporary: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_list, {
                        items: pages,
                        nav: "",
                        "item-props": ""
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "location"]),
                  createVNode(_component_v_main, { class: "d-flex flex-column overflow-hidden" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_container, {
                        fluid: "",
                        class: "pa-0 flex-grow-1 fill-height"
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }, 8, ["theme"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-Btbskd_j.mjs.map
