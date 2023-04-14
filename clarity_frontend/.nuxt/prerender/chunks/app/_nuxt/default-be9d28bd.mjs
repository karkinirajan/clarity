import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrRenderVNode, ssrInterpolate, ssrRenderAttrs } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc, a as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, unref, withCtx, createVNode, createTextVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, toDisplayString, Transition, defineComponent, h, mergeProps } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue/index.mjs';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from 'file:///home/kneeraazon/clarity_frontend/node_modules/@headlessui/vue/dist/headlessui.esm.js';
import { Bars3Icon, XMarkIcon, ChartBarIcon, CursorArrowRaysIcon, ShieldCheckIcon, Squares2X2Icon, ArrowPathIcon, PlayIcon, PhoneIcon, LifebuoyIcon, BookmarkSquareIcon, CalendarIcon } from 'file:///home/kneeraazon/clarity_frontend/node_modules/@heroicons/vue/24/outline/index.js';
import { ChevronDownIcon } from 'file:///home/kneeraazon/clarity_frontend/node_modules/@heroicons/vue/20/solid/index.js';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/hookable/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/unctx/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/ufo/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/h3/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/nitropack/node_modules/defu/dist/defu.mjs';
import '../../nitro/config.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/destr/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/scule/dist/index.mjs';

const _sfc_main$3 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const solutions = [
      {
        name: "Analytics",
        description: "Get a better understanding of where your traffic is coming from.",
        href: "#",
        icon: ChartBarIcon
      },
      {
        name: "Engagement",
        description: "Speak directly to your customers in a more meaningful way.",
        href: "#",
        icon: CursorArrowRaysIcon
      },
      {
        name: "Security",
        description: "Your customers' data will be safe and secure.",
        href: "#",
        icon: ShieldCheckIcon
      },
      {
        name: "Integrations",
        description: "Connect with third-party tools that you're already using.",
        href: "#",
        icon: Squares2X2Icon
      },
      {
        name: "Automations",
        description: "Build strategic funnels that will drive your customers to convert",
        href: "#",
        icon: ArrowPathIcon
      }
    ];
    const callsToAction = [
      { name: "Watch Demo", href: "#", icon: PlayIcon },
      { name: "Contact Sales", href: "#", icon: PhoneIcon }
    ];
    const resources = [
      {
        name: "Help Center",
        description: "Get all of your questions answered in our forums or contact support.",
        href: "#",
        icon: LifebuoyIcon
      },
      {
        name: "Guides",
        description: "Learn how to maximize our platform to get the most out of it.",
        href: "#",
        icon: BookmarkSquareIcon
      },
      {
        name: "Events",
        description: "See what meet-ups and other events we might be planning near you.",
        href: "#",
        icon: CalendarIcon
      },
      {
        name: "Security",
        description: "Understand how we take your privacy seriously.",
        href: "#",
        icon: ShieldCheckIcon
      }
    ];
    const recentPosts = [
      { id: 1, name: "Boost your conversion rate", href: "#" },
      {
        id: 2,
        name: "How to use search engine optimization to drive traffic to your site",
        href: "#"
      },
      { id: 3, name: "Improve your customer experience", href: "#" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Popover), { class: "relative bg-white" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-7xl px-6"${_scopeId}><div class="flex items-center justify-between py-6 md:justify-start md:space-x-10 shadow-none px-4"${_scopeId}><div class="flex justify-start lg:w-0 lg:flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="sr-only"${_scopeId2}> Clarity</span><img class="h-8 w-auto sm:h-10" src="https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png" alt=""${_scopeId2}>`);
                } else {
                  return [
                    createVNode("span", { class: "sr-only" }, " Clarity"),
                    createVNode("img", {
                      class: "h-8 w-auto sm:h-10",
                      src: "https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png",
                      alt: ""
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: "/about",
              class: "text-md font-bold text-gray-700 hover:text-gray-900 py-2 px-4 hidden lg:block"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Clarity`);
                } else {
                  return [
                    createTextVNode(" Clarity")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="-my-2 -mr-2 md:hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="sr-only"${_scopeId2}>Open menu</span>`);
                  _push3(ssrRenderComponent(unref(Bars3Icon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", { class: "sr-only" }, "Open menu"),
                    createVNode(unref(Bars3Icon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(PopoverGroup), {
              as: "nav",
              class: "hidden space-x-10 md:flex"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_nuxt_link, {
                    to: "/companies",
                    class: "text-md font-medium text-gray-700 hover:text-gray-900"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Companies`);
                      } else {
                        return [
                          createTextVNode(" Companies")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Popover), { class: "relative" }, {
                    default: withCtx(({ open }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(PopoverButton), {
                          class: [
                            open ? "text-gray-900" : "text-gray-900",
                            "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none "
                          ]
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span${_scopeId4}>Solutions</span>`);
                              _push5(ssrRenderComponent(unref(ChevronDownIcon), {
                                class: [
                                  open ? "text-gray-900" : "text-gray-900",
                                  "ml-2 h-5 w-5 group-hover:text-gray-900"
                                ],
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("span", null, "Solutions"),
                                createVNode(unref(ChevronDownIcon), {
                                  class: [
                                    open ? "text-gray-900" : "text-gray-900",
                                    "ml-2 h-5 w-5 group-hover:text-gray-900"
                                  ],
                                  "aria-hidden": "true"
                                }, null, 8, ["class"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(``);
                        _push4(ssrRenderComponent(unref(PopoverPanel), { class: "absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"${_scopeId4}><div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"${_scopeId4}><!--[-->`);
                              ssrRenderList(solutions, (item) => {
                                _push5(`<a${ssrRenderAttr("href", item.href)} class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"${_scopeId4}>`);
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(item.icon), {
                                  class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                  "aria-hidden": "true"
                                }, null), _parent5, _scopeId4);
                                _push5(`<div class="ml-4"${_scopeId4}><p class="text-base font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(item.name)}</p><p class="mt-1 text-sm text-gray-800"${_scopeId4}>${ssrInterpolate(item.description)}</p></div></a>`);
                              });
                              _push5(`<!--]--></div><div class="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8"${_scopeId4}><!--[-->`);
                              ssrRenderList(callsToAction, (item) => {
                                _push5(`<div class="flow-root"${_scopeId4}><a${ssrRenderAttr("href", item.href)} class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"${_scopeId4}>`);
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(item.icon), {
                                  class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                  "aria-hidden": "true"
                                }, null), _parent5, _scopeId4);
                                _push5(`<span class="ml-3"${_scopeId4}>${ssrInterpolate(item.name)}</span></a></div>`);
                              });
                              _push5(`<!--]--></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                  createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(solutions, (item) => {
                                      return createVNode("a", {
                                        key: item.name,
                                        href: item.href,
                                        class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                          "aria-hidden": "true"
                                        })),
                                        createVNode("div", { class: "ml-4" }, [
                                          createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                          createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                        ])
                                      ], 8, ["href"]);
                                    }), 64))
                                  ]),
                                  createVNode("div", { class: "space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(callsToAction, (item) => {
                                      return createVNode("div", {
                                        key: item.name,
                                        class: "flow-root"
                                      }, [
                                        createVNode("a", {
                                          href: item.href,
                                          class: "-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                            "aria-hidden": "true"
                                          })),
                                          createVNode("span", { class: "ml-3" }, toDisplayString(item.name), 1)
                                        ], 8, ["href"])
                                      ]);
                                    }), 64))
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(PopoverButton), {
                            class: [
                              open ? "text-gray-900" : "text-gray-900",
                              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none "
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "Solutions"),
                              createVNode(unref(ChevronDownIcon), {
                                class: [
                                  open ? "text-gray-900" : "text-gray-900",
                                  "ml-2 h-5 w-5 group-hover:text-gray-900"
                                ],
                                "aria-hidden": "true"
                              }, null, 8, ["class"])
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-out duration-200",
                            "enter-from-class": "opacity-0 translate-y-1",
                            "enter-to-class": "opacity-100 translate-y-0",
                            "leave-active-class": "transition ease-in duration-150",
                            "leave-from-class": "opacity-100 translate-y-0",
                            "leave-to-class": "opacity-0 translate-y-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(PopoverPanel), { class: "absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                    createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(solutions, (item) => {
                                        return createVNode("a", {
                                          key: item.name,
                                          href: item.href,
                                          class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                            "aria-hidden": "true"
                                          })),
                                          createVNode("div", { class: "ml-4" }, [
                                            createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                            createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                          ])
                                        ], 8, ["href"]);
                                      }), 64))
                                    ]),
                                    createVNode("div", { class: "space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(callsToAction, (item) => {
                                        return createVNode("div", {
                                          key: item.name,
                                          class: "flow-root"
                                        }, [
                                          createVNode("a", {
                                            href: item.href,
                                            class: "-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                                          }, [
                                            (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                              class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                              "aria-hidden": "true"
                                            })),
                                            createVNode("span", { class: "ml-3" }, toDisplayString(item.name), 1)
                                          ], 8, ["href"])
                                        ]);
                                      }), 64))
                                    ])
                                  ])
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
                  _push3(ssrRenderComponent(unref(Popover), { class: "relative" }, {
                    default: withCtx(({ open }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(PopoverButton), {
                          class: [
                            open ? "text-gray-900" : "text-gray-900",
                            "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
                          ]
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span${_scopeId4}>More</span>`);
                              _push5(ssrRenderComponent(unref(ChevronDownIcon), {
                                class: [
                                  open ? "text-gray-900" : "text-gray-900",
                                  "ml-2 h-5 w-5 group-hover:text-gray-900"
                                ],
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("span", null, "More"),
                                createVNode(unref(ChevronDownIcon), {
                                  class: [
                                    open ? "text-gray-900" : "text-gray-900",
                                    "ml-2 h-5 w-5 group-hover:text-gray-900"
                                  ],
                                  "aria-hidden": "true"
                                }, null, 8, ["class"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(``);
                        _push4(ssrRenderComponent(unref(PopoverPanel), { class: "absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"${_scopeId4}><div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"${_scopeId4}><!--[-->`);
                              ssrRenderList(resources, (item) => {
                                _push5(`<a${ssrRenderAttr("href", item.href)} class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"${_scopeId4}>`);
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(item.icon), {
                                  class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                  "aria-hidden": "true"
                                }, null), _parent5, _scopeId4);
                                _push5(`<div class="ml-4"${_scopeId4}><p class="text-base font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(item.name)}</p><p class="mt-1 text-sm text-gray-800"${_scopeId4}>${ssrInterpolate(item.description)}</p></div></a>`);
                              });
                              _push5(`<!--]--></div><div class="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8"${_scopeId4}><div${_scopeId4}><h3 class="text-base font-medium text-gray-800"${_scopeId4}>Recent Posts</h3><ul role="list" class="mt-4 space-y-4"${_scopeId4}><!--[-->`);
                              ssrRenderList(recentPosts, (post) => {
                                _push5(`<li class="truncate text-base"${_scopeId4}><a${ssrRenderAttr("href", post.href)} class="font-medium text-gray-900 hover:text-gray-700"${_scopeId4}>${ssrInterpolate(post.name)}</a></li>`);
                              });
                              _push5(`<!--]--></ul></div><div class="mt-5 text-sm"${_scopeId4}><a href="#" class="font-medium text-teal-600 hover:text-teal-800"${_scopeId4}> View all posts <span aria-hidden="true"${_scopeId4}> \u2192</span></a></div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                  createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(resources, (item) => {
                                      return createVNode("a", {
                                        key: item.name,
                                        href: item.href,
                                        class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                          "aria-hidden": "true"
                                        })),
                                        createVNode("div", { class: "ml-4" }, [
                                          createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                          createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                        ])
                                      ], 8, ["href"]);
                                    }), 64))
                                  ]),
                                  createVNode("div", { class: "bg-gray-50 px-5 py-5 sm:px-8 sm:py-8" }, [
                                    createVNode("div", null, [
                                      createVNode("h3", { class: "text-base font-medium text-gray-800" }, "Recent Posts"),
                                      createVNode("ul", {
                                        role: "list",
                                        class: "mt-4 space-y-4"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(recentPosts, (post) => {
                                          return createVNode("li", {
                                            key: post.id,
                                            class: "truncate text-base"
                                          }, [
                                            createVNode("a", {
                                              href: post.href,
                                              class: "font-medium text-gray-900 hover:text-gray-700"
                                            }, toDisplayString(post.name), 9, ["href"])
                                          ]);
                                        }), 64))
                                      ])
                                    ]),
                                    createVNode("div", { class: "mt-5 text-sm" }, [
                                      createVNode("a", {
                                        href: "#",
                                        class: "font-medium text-teal-600 hover:text-teal-800"
                                      }, [
                                        createTextVNode(" View all posts "),
                                        createVNode("span", { "aria-hidden": "true" }, " \u2192")
                                      ])
                                    ])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(PopoverButton), {
                            class: [
                              open ? "text-gray-900" : "text-gray-900",
                              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "More"),
                              createVNode(unref(ChevronDownIcon), {
                                class: [
                                  open ? "text-gray-900" : "text-gray-900",
                                  "ml-2 h-5 w-5 group-hover:text-gray-900"
                                ],
                                "aria-hidden": "true"
                              }, null, 8, ["class"])
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-out duration-200",
                            "enter-from-class": "opacity-0 translate-y-1",
                            "enter-to-class": "opacity-100 translate-y-0",
                            "leave-active-class": "transition ease-in duration-150",
                            "leave-from-class": "opacity-100 translate-y-0",
                            "leave-to-class": "opacity-0 translate-y-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(PopoverPanel), { class: "absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                    createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(resources, (item) => {
                                        return createVNode("a", {
                                          key: item.name,
                                          href: item.href,
                                          class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                            "aria-hidden": "true"
                                          })),
                                          createVNode("div", { class: "ml-4" }, [
                                            createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                            createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                          ])
                                        ], 8, ["href"]);
                                      }), 64))
                                    ]),
                                    createVNode("div", { class: "bg-gray-50 px-5 py-5 sm:px-8 sm:py-8" }, [
                                      createVNode("div", null, [
                                        createVNode("h3", { class: "text-base font-medium text-gray-800" }, "Recent Posts"),
                                        createVNode("ul", {
                                          role: "list",
                                          class: "mt-4 space-y-4"
                                        }, [
                                          (openBlock(), createBlock(Fragment, null, renderList(recentPosts, (post) => {
                                            return createVNode("li", {
                                              key: post.id,
                                              class: "truncate text-base"
                                            }, [
                                              createVNode("a", {
                                                href: post.href,
                                                class: "font-medium text-gray-900 hover:text-gray-700"
                                              }, toDisplayString(post.name), 9, ["href"])
                                            ]);
                                          }), 64))
                                        ])
                                      ]),
                                      createVNode("div", { class: "mt-5 text-sm" }, [
                                        createVNode("a", {
                                          href: "#",
                                          class: "font-medium text-teal-600 hover:text-teal-800"
                                        }, [
                                          createTextVNode(" View all posts "),
                                          createVNode("span", { "aria-hidden": "true" }, " \u2192")
                                        ])
                                      ])
                                    ])
                                  ])
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
                } else {
                  return [
                    createVNode(_component_nuxt_link, {
                      to: "/companies",
                      class: "text-md font-medium text-gray-700 hover:text-gray-900"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Companies")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Popover), { class: "relative" }, {
                      default: withCtx(({ open }) => [
                        createVNode(unref(PopoverButton), {
                          class: [
                            open ? "text-gray-900" : "text-gray-900",
                            "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none "
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Solutions"),
                            createVNode(unref(ChevronDownIcon), {
                              class: [
                                open ? "text-gray-900" : "text-gray-900",
                                "ml-2 h-5 w-5 group-hover:text-gray-900"
                              ],
                              "aria-hidden": "true"
                            }, null, 8, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(Transition, {
                          "enter-active-class": "transition ease-out duration-200",
                          "enter-from-class": "opacity-0 translate-y-1",
                          "enter-to-class": "opacity-100 translate-y-0",
                          "leave-active-class": "transition ease-in duration-150",
                          "leave-from-class": "opacity-100 translate-y-0",
                          "leave-to-class": "opacity-0 translate-y-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(PopoverPanel), { class: "absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                  createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(solutions, (item) => {
                                      return createVNode("a", {
                                        key: item.name,
                                        href: item.href,
                                        class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                          "aria-hidden": "true"
                                        })),
                                        createVNode("div", { class: "ml-4" }, [
                                          createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                          createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                        ])
                                      ], 8, ["href"]);
                                    }), 64))
                                  ]),
                                  createVNode("div", { class: "space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(callsToAction, (item) => {
                                      return createVNode("div", {
                                        key: item.name,
                                        class: "flow-root"
                                      }, [
                                        createVNode("a", {
                                          href: item.href,
                                          class: "-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                            "aria-hidden": "true"
                                          })),
                                          createVNode("span", { class: "ml-3" }, toDisplayString(item.name), 1)
                                        ], 8, ["href"])
                                      ]);
                                    }), 64))
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Popover), { class: "relative" }, {
                      default: withCtx(({ open }) => [
                        createVNode(unref(PopoverButton), {
                          class: [
                            open ? "text-gray-900" : "text-gray-900",
                            "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
                          ]
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "More"),
                            createVNode(unref(ChevronDownIcon), {
                              class: [
                                open ? "text-gray-900" : "text-gray-900",
                                "ml-2 h-5 w-5 group-hover:text-gray-900"
                              ],
                              "aria-hidden": "true"
                            }, null, 8, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(Transition, {
                          "enter-active-class": "transition ease-out duration-200",
                          "enter-from-class": "opacity-0 translate-y-1",
                          "enter-to-class": "opacity-100 translate-y-0",
                          "leave-active-class": "transition ease-in duration-150",
                          "leave-from-class": "opacity-100 translate-y-0",
                          "leave-to-class": "opacity-0 translate-y-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(PopoverPanel), { class: "absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                  createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(resources, (item) => {
                                      return createVNode("a", {
                                        key: item.name,
                                        href: item.href,
                                        class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                          "aria-hidden": "true"
                                        })),
                                        createVNode("div", { class: "ml-4" }, [
                                          createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                          createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                        ])
                                      ], 8, ["href"]);
                                    }), 64))
                                  ]),
                                  createVNode("div", { class: "bg-gray-50 px-5 py-5 sm:px-8 sm:py-8" }, [
                                    createVNode("div", null, [
                                      createVNode("h3", { class: "text-base font-medium text-gray-800" }, "Recent Posts"),
                                      createVNode("ul", {
                                        role: "list",
                                        class: "mt-4 space-y-4"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(recentPosts, (post) => {
                                          return createVNode("li", {
                                            key: post.id,
                                            class: "truncate text-base"
                                          }, [
                                            createVNode("a", {
                                              href: post.href,
                                              class: "font-medium text-gray-900 hover:text-gray-700"
                                            }, toDisplayString(post.name), 9, ["href"])
                                          ]);
                                        }), 64))
                                      ])
                                    ]),
                                    createVNode("div", { class: "mt-5 text-sm" }, [
                                      createVNode("a", {
                                        href: "#",
                                        class: "font-medium text-teal-600 hover:text-teal-800"
                                      }, [
                                        createTextVNode(" View all posts "),
                                        createVNode("span", { "aria-hidden": "true" }, " \u2192")
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
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
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(unref(PopoverPanel), {
              focus: "",
              class: "absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"${_scopeId2}><div class="px-5 pt-5 pb-6"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><img class="h-8 w-auto" src="https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png" alt="AIS Clarity"${_scopeId2}></div><div class="-mr-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="sr-only"${_scopeId3}>Close menu</span>`);
                        _push4(ssrRenderComponent(unref(XMarkIcon), {
                          class: "h-6 w-6",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", { class: "sr-only" }, "Close menu"),
                          createVNode(unref(XMarkIcon), {
                            class: "h-6 w-6",
                            "aria-hidden": "true"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="mt-6"${_scopeId2}><nav class="grid gap-y-8"${_scopeId2}><!--[-->`);
                  ssrRenderList(solutions, (item) => {
                    _push3(`<a${ssrRenderAttr("href", item.href)} class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(item.icon), {
                      class: "h-6 w-6 flex-shrink-0 text-teal-600",
                      "aria-hidden": "true"
                    }, null), _parent3, _scopeId2);
                    _push3(`<span class="ml-3 text-base font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(item.name)}</span></a>`);
                  });
                  _push3(`<!--]--></nav></div></div><div class="space-y-6 py-6 px-5"${_scopeId2}><div class="grid grid-cols-2 gap-y-4 gap-x-8"${_scopeId2}><a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"${_scopeId2}>Pricing</a><a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"${_scopeId2}>Docs</a><!--[-->`);
                  ssrRenderList(resources, (item) => {
                    _push3(`<a${ssrRenderAttr("href", item.href)} class="text-base font-medium text-gray-900 hover:text-gray-700"${_scopeId2}>${ssrInterpolate(item.name)}</a>`);
                  });
                  _push3(`<!--]--></div><div${_scopeId2}></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5" }, [
                      createVNode("div", { class: "px-5 pt-5 pb-6" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "h-8 w-auto",
                              src: "https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png",
                              alt: "AIS Clarity"
                            })
                          ]),
                          createVNode("div", { class: "-mr-2" }, [
                            createVNode(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "sr-only" }, "Close menu"),
                                createVNode(unref(XMarkIcon), {
                                  class: "h-6 w-6",
                                  "aria-hidden": "true"
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("nav", { class: "grid gap-y-8" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(solutions, (item) => {
                              return createVNode("a", {
                                key: item.name,
                                href: item.href,
                                class: "-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                              }, [
                                (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                  class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                  "aria-hidden": "true"
                                })),
                                createVNode("span", { class: "ml-3 text-base font-medium text-gray-900" }, toDisplayString(item.name), 1)
                              ], 8, ["href"]);
                            }), 64))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-6 py-6 px-5" }, [
                        createVNode("div", { class: "grid grid-cols-2 gap-y-4 gap-x-8" }, [
                          createVNode("a", {
                            href: "#",
                            class: "text-base font-medium text-gray-900 hover:text-gray-700"
                          }, "Pricing"),
                          createVNode("a", {
                            href: "#",
                            class: "text-base font-medium text-gray-900 hover:text-gray-700"
                          }, "Docs"),
                          (openBlock(), createBlock(Fragment, null, renderList(resources, (item) => {
                            return createVNode("a", {
                              key: item.name,
                              href: item.href,
                              class: "text-base font-medium text-gray-900 hover:text-gray-700"
                            }, toDisplayString(item.name), 9, ["href"]);
                          }), 64))
                        ]),
                        createVNode("div")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-7xl px-6" }, [
                createVNode("div", { class: "flex items-center justify-between py-6 md:justify-start md:space-x-10 shadow-none px-4" }, [
                  createVNode("div", { class: "flex justify-start lg:w-0 lg:flex-1" }, [
                    createVNode(_component_NuxtLink, { to: "/" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "sr-only" }, " Clarity"),
                        createVNode("img", {
                          class: "h-8 w-auto sm:h-10",
                          src: "https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png",
                          alt: ""
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_nuxt_link, {
                      to: "/about",
                      class: "text-md font-bold text-gray-700 hover:text-gray-900 py-2 px-4 hidden lg:block"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Clarity")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "-my-2 -mr-2 md:hidden" }, [
                    createVNode(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "sr-only" }, "Open menu"),
                        createVNode(unref(Bars3Icon), {
                          class: "h-6 w-6",
                          "aria-hidden": "true"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(PopoverGroup), {
                    as: "nav",
                    class: "hidden space-x-10 md:flex"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_nuxt_link, {
                        to: "/companies",
                        class: "text-md font-medium text-gray-700 hover:text-gray-900"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Companies")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Popover), { class: "relative" }, {
                        default: withCtx(({ open }) => [
                          createVNode(unref(PopoverButton), {
                            class: [
                              open ? "text-gray-900" : "text-gray-900",
                              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none "
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "Solutions"),
                              createVNode(unref(ChevronDownIcon), {
                                class: [
                                  open ? "text-gray-900" : "text-gray-900",
                                  "ml-2 h-5 w-5 group-hover:text-gray-900"
                                ],
                                "aria-hidden": "true"
                              }, null, 8, ["class"])
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-out duration-200",
                            "enter-from-class": "opacity-0 translate-y-1",
                            "enter-to-class": "opacity-100 translate-y-0",
                            "leave-active-class": "transition ease-in duration-150",
                            "leave-from-class": "opacity-100 translate-y-0",
                            "leave-to-class": "opacity-0 translate-y-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(PopoverPanel), { class: "absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                    createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(solutions, (item) => {
                                        return createVNode("a", {
                                          key: item.name,
                                          href: item.href,
                                          class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                            "aria-hidden": "true"
                                          })),
                                          createVNode("div", { class: "ml-4" }, [
                                            createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                            createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                          ])
                                        ], 8, ["href"]);
                                      }), 64))
                                    ]),
                                    createVNode("div", { class: "space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(callsToAction, (item) => {
                                        return createVNode("div", {
                                          key: item.name,
                                          class: "flow-root"
                                        }, [
                                          createVNode("a", {
                                            href: item.href,
                                            class: "-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                                          }, [
                                            (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                              class: "h-6 w-6 flex-shrink-0 text-gray-400",
                                              "aria-hidden": "true"
                                            })),
                                            createVNode("span", { class: "ml-3" }, toDisplayString(item.name), 1)
                                          ], 8, ["href"])
                                        ]);
                                      }), 64))
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Popover), { class: "relative" }, {
                        default: withCtx(({ open }) => [
                          createVNode(unref(PopoverButton), {
                            class: [
                              open ? "text-gray-900" : "text-gray-900",
                              "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "More"),
                              createVNode(unref(ChevronDownIcon), {
                                class: [
                                  open ? "text-gray-900" : "text-gray-900",
                                  "ml-2 h-5 w-5 group-hover:text-gray-900"
                                ],
                                "aria-hidden": "true"
                              }, null, 8, ["class"])
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-out duration-200",
                            "enter-from-class": "opacity-0 translate-y-1",
                            "enter-to-class": "opacity-100 translate-y-0",
                            "leave-active-class": "transition ease-in duration-150",
                            "leave-from-class": "opacity-100 translate-y-0",
                            "leave-to-class": "opacity-0 translate-y-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(PopoverPanel), { class: "absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" }, [
                                    createVNode("div", { class: "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(resources, (item) => {
                                        return createVNode("a", {
                                          key: item.name,
                                          href: item.href,
                                          class: "-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                            "aria-hidden": "true"
                                          })),
                                          createVNode("div", { class: "ml-4" }, [
                                            createVNode("p", { class: "text-base font-medium text-gray-900" }, toDisplayString(item.name), 1),
                                            createVNode("p", { class: "mt-1 text-sm text-gray-800" }, toDisplayString(item.description), 1)
                                          ])
                                        ], 8, ["href"]);
                                      }), 64))
                                    ]),
                                    createVNode("div", { class: "bg-gray-50 px-5 py-5 sm:px-8 sm:py-8" }, [
                                      createVNode("div", null, [
                                        createVNode("h3", { class: "text-base font-medium text-gray-800" }, "Recent Posts"),
                                        createVNode("ul", {
                                          role: "list",
                                          class: "mt-4 space-y-4"
                                        }, [
                                          (openBlock(), createBlock(Fragment, null, renderList(recentPosts, (post) => {
                                            return createVNode("li", {
                                              key: post.id,
                                              class: "truncate text-base"
                                            }, [
                                              createVNode("a", {
                                                href: post.href,
                                                class: "font-medium text-gray-900 hover:text-gray-700"
                                              }, toDisplayString(post.name), 9, ["href"])
                                            ]);
                                          }), 64))
                                        ])
                                      ]),
                                      createVNode("div", { class: "mt-5 text-sm" }, [
                                        createVNode("a", {
                                          href: "#",
                                          class: "font-medium text-teal-600 hover:text-teal-800"
                                        }, [
                                          createTextVNode(" View all posts "),
                                          createVNode("span", { "aria-hidden": "true" }, " \u2192")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode(Transition, {
                "enter-active-class": "duration-200 ease-out",
                "enter-from-class": "opacity-0 scale-95",
                "enter-to-class": "opacity-100 scale-100",
                "leave-active-class": "duration-100 ease-in",
                "leave-from-class": "opacity-100 scale-100",
                "leave-to-class": "opacity-0 scale-95"
              }, {
                default: withCtx(() => [
                  createVNode(unref(PopoverPanel), {
                    focus: "",
                    class: "absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5" }, [
                        createVNode("div", { class: "px-5 pt-5 pb-6" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "h-8 w-auto",
                                src: "https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png",
                                alt: "AIS Clarity"
                              })
                            ]),
                            createVNode("div", { class: "-mr-2" }, [
                              createVNode(unref(PopoverButton), { class: "inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "sr-only" }, "Close menu"),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "mt-6" }, [
                            createVNode("nav", { class: "grid gap-y-8" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(solutions, (item) => {
                                return createVNode("a", {
                                  key: item.name,
                                  href: item.href,
                                  class: "-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                }, [
                                  (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                    class: "h-6 w-6 flex-shrink-0 text-teal-600",
                                    "aria-hidden": "true"
                                  })),
                                  createVNode("span", { class: "ml-3 text-base font-medium text-gray-900" }, toDisplayString(item.name), 1)
                                ], 8, ["href"]);
                              }), 64))
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-6 py-6 px-5" }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-y-4 gap-x-8" }, [
                            createVNode("a", {
                              href: "#",
                              class: "text-base font-medium text-gray-900 hover:text-gray-700"
                            }, "Pricing"),
                            createVNode("a", {
                              href: "#",
                              class: "text-base font-medium text-gray-900 hover:text-gray-700"
                            }, "Docs"),
                            (openBlock(), createBlock(Fragment, null, renderList(resources, (item) => {
                              return createVNode("a", {
                                key: item.name,
                                href: item.href,
                                class: "text-base font-medium text-gray-900 hover:text-gray-700"
                              }, toDisplayString(item.name), 9, ["href"]);
                            }), 64))
                          ]),
                          createVNode("div")
                        ])
                      ])
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
      _push(`<hr class="lg:block"><!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = {
      solutions: [
        { name: "Marketing", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Commerce", href: "#" },
        { name: "Insights", href: "#" }
      ],
      support: [
        { name: "Pricing", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "API Status", href: "#" }
      ],
      company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" }
      ],
      legal: [
        { name: "Claim", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" }
      ],
      social: [
        {
          name: "Facebook",
          href: "#",
          icon: defineComponent({
            render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
              h("path", {
                "fill-rule": "evenodd",
                d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                "clip-rule": "evenodd"
              })
            ])
          })
        },
        {
          name: "Instagram",
          href: "#",
          icon: defineComponent({
            render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
              h("path", {
                "fill-rule": "evenodd",
                d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                "clip-rule": "evenodd"
              })
            ])
          })
        },
        {
          name: "Twitter",
          href: "#",
          icon: defineComponent({
            render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
              h("path", {
                d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              })
            ])
          })
        },
        {
          name: "GitHub",
          href: "#",
          icon: defineComponent({
            render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
              h("path", {
                "fill-rule": "evenodd",
                d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                "clip-rule": "evenodd"
              })
            ])
          })
        },
        {
          name: "YouTube",
          href: "#",
          icon: defineComponent({
            render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
              h("path", {
                "fill-rule": "evenodd",
                d: "M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z",
                "clip-rule": "evenodd"
              })
            ])
          })
        }
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><hr><footer class="bg-white" aria-labelledby="footer-heading"><h2 id="footer-heading" class="sr-only">Footer</h2><div class="mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-8"><br><div class="xl:grid xl:grid-cols-3 xl:gap-8"><div class="space-y-8"><img class="h-12" src="https://uploads-ssl.webflow.com/6307dab7ccd6814bdff05e47/630d05c0f5fa6136548101e4_625e09ac30a70f500eaab051_ais_icon-p-500-p-500.png" alt="Company name"><p class="text-sm leading-6 text-gray-600"> Making the world a better place through constructing elegant hierarchies. </p><div class="flex space-x-6"><!--[-->`);
      ssrRenderList(navigation.social, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="text-gray-400 hover:text-gray-500"><span class="sr-only">${ssrInterpolate(item.name)}</span>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), {
          class: "h-6 w-6",
          "aria-hidden": "true"
        }, null), _parent);
        _push(`</a>`);
      });
      _push(`<!--]--></div></div><div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0"><div class="md:grid md:grid-cols-2 md:gap-8"><div><h3 class="text-sm font-semibold leading-6 text-gray-900">Solutions</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.solutions, (item) => {
        _push(`<li><a${ssrRenderAttr("href", item.href)} class="text-sm leading-6 text-gray-600 hover:text-gray-900">${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="mt-10 md:mt-0"><h3 class="text-sm font-semibold leading-6 text-gray-900">Support</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.support, (item) => {
        _push(`<li><a${ssrRenderAttr("href", item.href)} class="text-sm leading-6 text-gray-600 hover:text-gray-900">${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="md:grid md:grid-cols-2 md:gap-8"><div><h3 class="text-sm font-semibold leading-6 text-gray-900">Company</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.company, (item) => {
        _push(`<li><a${ssrRenderAttr("href", item.href)} class="text-sm leading-6 text-gray-600 hover:text-gray-900">${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="mt-10 md:mt-0"><h3 class="text-sm font-semibold leading-6 text-gray-900">Legal</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.legal, (item) => {
        _push(`<li><a${ssrRenderAttr("href", item.href)} class="text-sm leading-6 text-gray-600 hover:text-gray-900">${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div><div class="mt-16 border-t border-gray-900/20 pt-8 sm:mt-20 lg:mt-24"><p class="text-xs leading-5 text-gray-500"> \xA9 2023 AIS Clarity, All rights reserved. </p></div></div></footer><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-7xl py-8 px-6 lg:flex lg:items-center lg:py-16 lg:px-8 border-t" }, _attrs))}><div class="lg:w-0 lg:flex-1"><h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> Sign up for our newsletter </h2><p class="mt-3 max-w-3xl text-lg text-gray-500"> Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat. </p></div><div class="mt-8 lg:mt-0 lg:ml-8"><form class="sm:flex"><label for="email-address" class="sr-only">Email address</label><input id="email-address" name="email-address" type="email" autocomplete="email" required="true" class="w-full rounded-md border border-gray-300 px-5 py-3 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:max-w-xs" placeholder="Enter your email"><div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"><button type="submit" class="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-800 py-3 px-5 text-base font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"> Notify me </button></div></form><p class="mt-3 text-sm text-gray-500"> We care about the protection of your data. Read our ${ssrInterpolate(" ")} <a href="#" class="font-medium underline">Privacy Policy.</a></p></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Newsletter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Newsletter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(Newsletter, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
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
//# sourceMappingURL=default-be9d28bd.mjs.map
