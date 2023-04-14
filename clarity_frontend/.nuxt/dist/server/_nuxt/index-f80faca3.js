import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from "vue/server-renderer";
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/20/solid";
import { _ as _sfc_main$1 } from "./FlatCardsWithDividers-ae219192.js";
import "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "ufo";
import "h3";
import "@vue/devtools-api";
import "@unhead/vue";
import "@unhead/dom";
import "@unhead/ssr";
import "vue-router";
import "defu";
import "./CompanyStore-da34e7fa.js";
const __default__ = {
  components: {
    FlatCardsWithDividers: _sfc_main$1
  },
  setup() {
    return {
      checkedValues
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const filters = ref([]);
    const mobileFiltersOpen = ref(false);
    const checkedValues2 = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}><div>`);
      _push(ssrRenderComponent(unref(TransitionRoot), {
        as: "template",
        show: mobileFiltersOpen.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative lg:hidden",
              onClose: ($event) => mobileFiltersOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 z-40 flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition ease-in-out duration-300 transform",
                    "enter-from": "translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transition ease-in-out duration-300 transform",
                    "leave-from": "translate-x-0",
                    "leave-to": "translate-x-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-center justify-between px-4"${_scopeId4}><h2 class="text-lg font-medium text-gray-900"${_scopeId4}>Filters</h2><button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"${_scopeId4}><span class="sr-only"${_scopeId4}>Close menu</span>`);
                              _push5(ssrRenderComponent(unref(XMarkIcon), {
                                class: "h-6 w-6",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(`</button></div><form class="mt-4"${_scopeId4}><!--[-->`);
                              ssrRenderList(filters.value, (section) => {
                                _push5(ssrRenderComponent(unref(Disclosure), {
                                  as: "div",
                                  key: section.name,
                                  class: "border-t border-gray-200 pt-4 pb-4"
                                }, {
                                  default: withCtx(({ open }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<fieldset${_scopeId5}><legend class="w-full px-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(DisclosureButton), { class: "flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500" }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<span class="text-sm font-medium text-gray-700"${_scopeId6}>${ssrInterpolate(section.name)}</span><span class="ml-6 flex h-7 items-center"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(ChevronDownIcon), {
                                              class: [
                                                open ? "-rotate-180" : "rotate-0",
                                                "h-5 w-5 transform"
                                              ],
                                              "aria-hidden": "true"
                                            }, null, _parent7, _scopeId6));
                                            _push7(`</span>`);
                                          } else {
                                            return [
                                              createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(section.name), 1),
                                              createVNode("span", { class: "ml-6 flex h-7 items-center" }, [
                                                createVNode(unref(ChevronDownIcon), {
                                                  class: [
                                                    open ? "-rotate-180" : "rotate-0",
                                                    "h-5 w-5 transform"
                                                  ],
                                                  "aria-hidden": "true"
                                                }, null, 8, ["class"])
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`</legend>`);
                                      _push6(ssrRenderComponent(unref(DisclosurePanel), { class: "px-4 pt-4 pb-2" }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="space-y-6"${_scopeId6}><!--[-->`);
                                            ssrRenderList(section.options, (option, optionIdx) => {
                                              _push7(`<div class="flex items-center"${_scopeId6}><input${ssrRenderAttr("id", `${section.id}-${optionIdx}-mobile`)}${ssrRenderAttr("name", `${section.id}[]`)}${ssrRenderAttr("value", option.value)} type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(checkedValues2.value) ? ssrLooseContain(checkedValues2.value, option.value) : checkedValues2.value) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"${_scopeId6}><label${ssrRenderAttr("for", `${section.id}-${optionIdx}-mobile`)} class="ml-3 text-sm text-gray-900"${_scopeId6}>${ssrInterpolate(option.label)}</label></div>`);
                                            });
                                            _push7(`<!--]--></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "space-y-6" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: option.value,
                                                    class: "flex items-center"
                                                  }, [
                                                    withDirectives(createVNode("input", {
                                                      id: `${section.id}-${optionIdx}-mobile`,
                                                      name: `${section.id}[]`,
                                                      value: option.value,
                                                      type: "checkbox",
                                                      "onUpdate:modelValue": ($event) => checkedValues2.value = $event,
                                                      class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    }, null, 8, ["id", "name", "value", "onUpdate:modelValue"]), [
                                                      [vModelCheckbox, checkedValues2.value]
                                                    ]),
                                                    createVNode("label", {
                                                      for: `${section.id}-${optionIdx}-mobile`,
                                                      class: "ml-3 text-sm text-gray-900"
                                                    }, toDisplayString(option.label), 9, ["for"])
                                                  ]);
                                                }), 128))
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`</fieldset>`);
                                    } else {
                                      return [
                                        createVNode("fieldset", null, [
                                          createVNode("legend", { class: "w-full px-2" }, [
                                            createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500" }, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(section.name), 1),
                                                createVNode("span", { class: "ml-6 flex h-7 items-center" }, [
                                                  createVNode(unref(ChevronDownIcon), {
                                                    class: [
                                                      open ? "-rotate-180" : "rotate-0",
                                                      "h-5 w-5 transform"
                                                    ],
                                                    "aria-hidden": "true"
                                                  }, null, 8, ["class"])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          createVNode(unref(DisclosurePanel), { class: "px-4 pt-4 pb-2" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "space-y-6" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: option.value,
                                                    class: "flex items-center"
                                                  }, [
                                                    withDirectives(createVNode("input", {
                                                      id: `${section.id}-${optionIdx}-mobile`,
                                                      name: `${section.id}[]`,
                                                      value: option.value,
                                                      type: "checkbox",
                                                      "onUpdate:modelValue": ($event) => checkedValues2.value = $event,
                                                      class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    }, null, 8, ["id", "name", "value", "onUpdate:modelValue"]), [
                                                      [vModelCheckbox, checkedValues2.value]
                                                    ]),
                                                    createVNode("label", {
                                                      for: `${section.id}-${optionIdx}-mobile`,
                                                      class: "ml-3 text-sm text-gray-900"
                                                    }, toDisplayString(option.label), 9, ["for"])
                                                  ]);
                                                }), 128))
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]--></form>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center justify-between px-4" }, [
                                  createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Filters"),
                                  createVNode("button", {
                                    type: "button",
                                    class: "-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500",
                                    onClick: ($event) => mobileFiltersOpen.value = false
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close menu"),
                                    createVNode(unref(XMarkIcon), {
                                      class: "h-6 w-6",
                                      "aria-hidden": "true"
                                    })
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("form", { class: "mt-4" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filters.value, (section) => {
                                    return openBlock(), createBlock(unref(Disclosure), {
                                      as: "div",
                                      key: section.name,
                                      class: "border-t border-gray-200 pt-4 pb-4"
                                    }, {
                                      default: withCtx(({ open }) => [
                                        createVNode("fieldset", null, [
                                          createVNode("legend", { class: "w-full px-2" }, [
                                            createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500" }, {
                                              default: withCtx(() => [
                                                createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(section.name), 1),
                                                createVNode("span", { class: "ml-6 flex h-7 items-center" }, [
                                                  createVNode(unref(ChevronDownIcon), {
                                                    class: [
                                                      open ? "-rotate-180" : "rotate-0",
                                                      "h-5 w-5 transform"
                                                    ],
                                                    "aria-hidden": "true"
                                                  }, null, 8, ["class"])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          createVNode(unref(DisclosurePanel), { class: "px-4 pt-4 pb-2" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "space-y-6" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                                                  return openBlock(), createBlock("div", {
                                                    key: option.value,
                                                    class: "flex items-center"
                                                  }, [
                                                    withDirectives(createVNode("input", {
                                                      id: `${section.id}-${optionIdx}-mobile`,
                                                      name: `${section.id}[]`,
                                                      value: option.value,
                                                      type: "checkbox",
                                                      "onUpdate:modelValue": ($event) => checkedValues2.value = $event,
                                                      class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    }, null, 8, ["id", "name", "value", "onUpdate:modelValue"]), [
                                                      [vModelCheckbox, checkedValues2.value]
                                                    ]),
                                                    createVNode("label", {
                                                      for: `${section.id}-${optionIdx}-mobile`,
                                                      class: "ml-3 text-sm text-gray-900"
                                                    }, toDisplayString(option.label), 9, ["for"])
                                                  ]);
                                                }), 128))
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between px-4" }, [
                                createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Filters"),
                                createVNode("button", {
                                  type: "button",
                                  class: "-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500",
                                  onClick: ($event) => mobileFiltersOpen.value = false
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close menu"),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "true"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              createVNode("form", { class: "mt-4" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(filters.value, (section) => {
                                  return openBlock(), createBlock(unref(Disclosure), {
                                    as: "div",
                                    key: section.name,
                                    class: "border-t border-gray-200 pt-4 pb-4"
                                  }, {
                                    default: withCtx(({ open }) => [
                                      createVNode("fieldset", null, [
                                        createVNode("legend", { class: "w-full px-2" }, [
                                          createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500" }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(section.name), 1),
                                              createVNode("span", { class: "ml-6 flex h-7 items-center" }, [
                                                createVNode(unref(ChevronDownIcon), {
                                                  class: [
                                                    open ? "-rotate-180" : "rotate-0",
                                                    "h-5 w-5 transform"
                                                  ],
                                                  "aria-hidden": "true"
                                                }, null, 8, ["class"])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        createVNode(unref(DisclosurePanel), { class: "px-4 pt-4 pb-2" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "space-y-6" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                                                return openBlock(), createBlock("div", {
                                                  key: option.value,
                                                  class: "flex items-center"
                                                }, [
                                                  withDirectives(createVNode("input", {
                                                    id: `${section.id}-${optionIdx}-mobile`,
                                                    name: `${section.id}[]`,
                                                    value: option.value,
                                                    type: "checkbox",
                                                    "onUpdate:modelValue": ($event) => checkedValues2.value = $event,
                                                    class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                  }, null, 8, ["id", "name", "value", "onUpdate:modelValue"]), [
                                                    [vModelCheckbox, checkedValues2.value]
                                                  ]),
                                                  createVNode("label", {
                                                    for: `${section.id}-${optionIdx}-mobile`,
                                                    class: "ml-3 text-sm text-gray-900"
                                                  }, toDisplayString(option.label), 9, ["for"])
                                                ]);
                                              }), 128))
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition-opacity ease-linear duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "transition-opacity ease-linear duration-300",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 z-40 flex" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "transition ease-in-out duration-300 transform",
                        "enter-from": "translate-x-full",
                        "enter-to": "translate-x-0",
                        leave: "transition ease-in-out duration-300 transform",
                        "leave-from": "translate-x-0",
                        "leave-to": "translate-x-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between px-4" }, [
                                createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Filters"),
                                createVNode("button", {
                                  type: "button",
                                  class: "-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500",
                                  onClick: ($event) => mobileFiltersOpen.value = false
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close menu"),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "true"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              createVNode("form", { class: "mt-4" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(filters.value, (section) => {
                                  return openBlock(), createBlock(unref(Disclosure), {
                                    as: "div",
                                    key: section.name,
                                    class: "border-t border-gray-200 pt-4 pb-4"
                                  }, {
                                    default: withCtx(({ open }) => [
                                      createVNode("fieldset", null, [
                                        createVNode("legend", { class: "w-full px-2" }, [
                                          createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500" }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(section.name), 1),
                                              createVNode("span", { class: "ml-6 flex h-7 items-center" }, [
                                                createVNode(unref(ChevronDownIcon), {
                                                  class: [
                                                    open ? "-rotate-180" : "rotate-0",
                                                    "h-5 w-5 transform"
                                                  ],
                                                  "aria-hidden": "true"
                                                }, null, 8, ["class"])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        createVNode(unref(DisclosurePanel), { class: "px-4 pt-4 pb-2" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "space-y-6" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                                                return openBlock(), createBlock("div", {
                                                  key: option.value,
                                                  class: "flex items-center"
                                                }, [
                                                  withDirectives(createVNode("input", {
                                                    id: `${section.id}-${optionIdx}-mobile`,
                                                    name: `${section.id}[]`,
                                                    value: option.value,
                                                    type: "checkbox",
                                                    "onUpdate:modelValue": ($event) => checkedValues2.value = $event,
                                                    class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                  }, null, 8, ["id", "name", "value", "onUpdate:modelValue"]), [
                                                    [vModelCheckbox, checkedValues2.value]
                                                  ]),
                                                  createVNode("label", {
                                                    for: `${section.id}-${optionIdx}-mobile`,
                                                    class: "ml-3 text-sm text-gray-900"
                                                  }, toDisplayString(option.label), 9, ["for"])
                                                ]);
                                              }), 128))
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative lg:hidden",
                onClose: ($event) => mobileFiltersOpen.value = false
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 z-40 flex" }, [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition ease-in-out duration-300 transform",
                      "enter-from": "translate-x-full",
                      "enter-to": "translate-x-0",
                      leave: "transition ease-in-out duration-300 transform",
                      "leave-from": "translate-x-0",
                      "leave-to": "translate-x-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DialogPanel), { class: "relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center justify-between px-4" }, [
                              createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Filters"),
                              createVNode("button", {
                                type: "button",
                                class: "-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500",
                                onClick: ($event) => mobileFiltersOpen.value = false
                              }, [
                                createVNode("span", { class: "sr-only" }, "Close menu"),
                                createVNode(unref(XMarkIcon), {
                                  class: "h-6 w-6",
                                  "aria-hidden": "true"
                                })
                              ], 8, ["onClick"])
                            ]),
                            createVNode("form", { class: "mt-4" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(filters.value, (section) => {
                                return openBlock(), createBlock(unref(Disclosure), {
                                  as: "div",
                                  key: section.name,
                                  class: "border-t border-gray-200 pt-4 pb-4"
                                }, {
                                  default: withCtx(({ open }) => [
                                    createVNode("fieldset", null, [
                                      createVNode("legend", { class: "w-full px-2" }, [
                                        createVNode(unref(DisclosureButton), { class: "flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500" }, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(section.name), 1),
                                            createVNode("span", { class: "ml-6 flex h-7 items-center" }, [
                                              createVNode(unref(ChevronDownIcon), {
                                                class: [
                                                  open ? "-rotate-180" : "rotate-0",
                                                  "h-5 w-5 transform"
                                                ],
                                                "aria-hidden": "true"
                                              }, null, 8, ["class"])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      createVNode(unref(DisclosurePanel), { class: "px-4 pt-4 pb-2" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "space-y-6" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(section.options, (option, optionIdx) => {
                                              return openBlock(), createBlock("div", {
                                                key: option.value,
                                                class: "flex items-center"
                                              }, [
                                                withDirectives(createVNode("input", {
                                                  id: `${section.id}-${optionIdx}-mobile`,
                                                  name: `${section.id}[]`,
                                                  value: option.value,
                                                  type: "checkbox",
                                                  "onUpdate:modelValue": ($event) => checkedValues2.value = $event,
                                                  class: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                }, null, 8, ["id", "name", "value", "onUpdate:modelValue"]), [
                                                  [vModelCheckbox, checkedValues2.value]
                                                ]),
                                                createVNode("label", {
                                                  for: `${section.id}-${optionIdx}-mobile`,
                                                  class: "ml-3 text-sm text-gray-900"
                                                }, toDisplayString(option.label), 9, ["for"])
                                              ]);
                                            }), 128))
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<main class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"><div class="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4"><aside><h2 class="sr-only">Filters</h2><button type="button" class="inline-flex items-center lg:hidden"><span class="text-lg font-medium text-gray-700 py-4">Filters</span>`);
      _push(ssrRenderComponent(unref(PlusIcon), {
        class: "ml-1 h-5 w-5 flex-shrink-0 text-gray-400",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button><div class="hidden lg:block mt-4"><form class="space-y-10 divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(filters.value, (section, sectionIdx) => {
        _push(`<div class="${ssrRenderClass(sectionIdx === 0 ? null : "pt-10")}"><fieldset><legend class="block text-lg font-bold text-gray-700">${ssrInterpolate(section.name)}</legend><div class="space-y-3 pt-6"><!--[-->`);
        ssrRenderList(section.options, (option, optionIdx) => {
          _push(`<div class="flex items-center"><input${ssrRenderAttr("id", option.id)}${ssrRenderAttr("name", option.name)}${ssrRenderAttr("value", option.value)} type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(checkedValues2.value) ? ssrLooseContain(checkedValues2.value, option.value) : checkedValues2.value) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"><label${ssrRenderAttr("for", option.id)} class="ml-3 text-sm text-gray-900">${ssrInterpolate(option.label)}</label></div>`);
        });
        _push(`<!--]--></div></fieldset></div>`);
      });
      _push(`<!--]--></form></div></aside><div class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, { checkedValues: checkedValues2.value }, null, _parent));
      _push(`</div></div></div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/companies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-f80faca3.js.map
