import { a as __nuxt_component_0 } from "../server.mjs";
import { computed, ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { c as companyStore } from "./CompanyStore-da34e7fa.js";
const _sfc_main = {
  __name: "FlatCardsWithDividers",
  __ssrInlineRender: true,
  props: {
    checkedValues: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const store = companyStore();
    const tags = computed(() => {
      if (store.tags.length > 4) {
        return store.tags.slice(4, 7);
      } else {
        return [];
      }
    });
    const filteredItems = computed(() => store.filteredItems);
    const companyDescription = (description) => {
      if (description.length > 200) {
        return description.substring(0, 200) + "...";
      } else {
        return description;
      }
    };
    const filter = computed({
      get: () => store.filter,
      set: (value) => store.filter = value
    });
    const checkedValues = computed(() => props.checkedValues);
    const searchInputValue = ref("");
    const filterWithCheckedValuesAndSearchInput = computed(() => {
      const filterValue = filter.value.trim();
      const checkedValuesValue = checkedValues.value.join(" ");
      const searchInputValueTrimmed = searchInputValue.value.trim().toLowerCase();
      ref([]);
      let result = "";
      if (filterValue) {
        result += filterValue + " ";
      }
      if (checkedValuesValue) {
        result += checkedValuesValue + " ";
      }
      if (searchInputValueTrimmed) {
        result += searchInputValueTrimmed;
      }
      return result.trim() || "Type to filter...";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="px-4 py-4 bg-teal-50 border rounded-xl my-6 shadow-sm"><div class="relative"><input class="search__input w-full rounded-lg border-gray-400" type="text"${ssrRenderAttr("placeholder", unref(filterWithCheckedValuesAndSearchInput) || "Type to filter...")}${ssrRenderAttr("value", unref(filter))}></div></div><div class="rounded-xl border border-gray-200 bg-white"><ul role="list" class="divide-y divide-gray-300"><!--[-->`);
      ssrRenderList(unref(filteredItems), (company) => {
        _push(`<li class="py-4 px-1">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/companies/${company.id}/`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="lg:flex block items-center justify-between"${_scopeId}><div${_scopeId}><img class="h-auto w-auto object-cover rounded-full hidden lg:block mx-auto my-0 p-2"${ssrRenderAttr("src", company.logo ? company.logo : "")} alt=" logo N/A"${_scopeId}></div><div class="md:px-4 px-2"${_scopeId}><p class="font-bold text-lg text-gray-700 hover:text-gray-600"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/companies/${company.id}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(company.company_name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(company.company_name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</p><div class="text-gray-600 py-2 text-sm md:text-md"${_scopeId}>${companyDescription(company.description)}</div><div class="flex items-center space-x-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(tags), (item) => {
                _push2(`<div class="flex items-center space-x-2"${_scopeId}><span class="inline-flex items-center justify-center px-2 py-1 font-medium leading-4 text-gray-600 bg-gray-200 rounded-md text-xs md:text-sm"${_scopeId}>${ssrInterpolate(item.name)}</span></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "lg:flex block items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "h-auto w-auto object-cover rounded-full hidden lg:block mx-auto my-0 p-2",
                      src: company.logo ? company.logo : "",
                      alt: " logo N/A"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "md:px-4 px-2" }, [
                    createVNode("p", { class: "font-bold text-lg text-gray-700 hover:text-gray-600" }, [
                      createVNode(_component_NuxtLink, {
                        to: `/companies/${company.id}`
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(company.company_name), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]),
                    createVNode("div", {
                      class: "text-gray-600 py-2 text-sm md:text-md",
                      innerHTML: companyDescription(company.description)
                    }, null, 8, ["innerHTML"]),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (item) => {
                        return openBlock(), createBlock("div", {
                          class: "flex items-center space-x-2",
                          key: item.id
                        }, [
                          createVNode("span", { class: "inline-flex items-center justify-center px-2 py-1 font-medium leading-4 text-gray-600 bg-gray-200 rounded-md text-xs md:text-sm" }, toDisplayString(item.name), 1)
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><button class="bg-teal-800 hover:bg-teal-700 text-white text-center font-bold py-3 px-12 m-4 items-center rounded focus:outline-none focus:shadow-outline"> Load More </button><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FlatCardsWithDividers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=FlatCardsWithDividers-ae219192.js.map
