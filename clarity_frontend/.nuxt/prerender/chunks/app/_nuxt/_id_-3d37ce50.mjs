import { computed, ref, defineComponent, h, unref, createVNode, resolveDynamicComponent, useSSRContext, mergeProps, withCtx, createTextVNode, toDisplayString } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderAttrs } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import { a as __nuxt_component_0$1 } from '../server.mjs';
import { HomeIcon } from 'file:///home/kneeraazon/clarity_frontend/node_modules/@heroicons/vue/20/solid/index.js';
import { c as companyStore } from './CompanyStore-da34e7fa.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/hookable/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/unctx/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/ufo/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/h3/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/nitropack/node_modules/defu/dist/defu.mjs';
import '../../nitro/config.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/destr/dist/index.mjs';
import 'file:///home/kneeraazon/clarity_frontend/node_modules/scule/dist/index.mjs';

const _sfc_main$1 = {
  __name: "SubPageMenu",
  __ssrInlineRender: true,
  props: {
    companyName: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const pages = [
      {
        name: "companies",
        href: "/companies",
        current: true,
        href_and_company_name: "#"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid flex justify-start mx-auto md:px-80 bg-gray-50" }, _attrs))}><nav class="flex" aria-label="Breadcrumb"><ol role="list" class="flex space-x-4 bg-gray-50 px-6 broder-2"><li class="flex"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(HomeIcon), {
              class: "w-6 flex-shrink-0",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`<span class="sr-only"${_scopeId}>Home</span>`);
          } else {
            return [
              createVNode(unref(HomeIcon), {
                class: "w-6 flex-shrink-0",
                "aria-hidden": "true"
              }),
              createVNode("span", { class: "sr-only" }, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><!--[-->`);
      ssrRenderList(pages, (page) => {
        _push(`<li class="flex"><div class="flex items-center"><svg class="h-full w-6 flex-shrink-0 text-gray-600" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"></path></svg>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: page.href,
          class: "ml-4 text-sm font-medium text-gray-700 hover:text-gray-700",
          "aria-current": page.current ? "page" : void 0
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(page.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(page.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<svg class="h-full w-6 flex-shrink-0 text-gray-600" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"></path></svg>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: page.href_and_company_name,
          class: "ml-4 text-sm font-medium text-gray-700 hover:text-gray-700",
          "aria-current": page.current ? "page" : void 0
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.companyName)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.companyName), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></li>`);
      });
      _push(`<!--]--></ol></nav></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SubPageMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const store = companyStore();
    const tags = computed(() => {
      if (store.tags.length > 4) {
        return store.tags.slice(4, 7);
      } else {
        return [];
      }
    });
    const company = ref({});
    useRoute();
    const socials = [
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
        name: "Twitter",
        href: "#",
        icon: defineComponent({
          render: () => h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
            })
          ])
        })
      }
    ];
    const companyDescription = (description) => {
      if (description && description.length > 200) {
        return description;
      } else {
        return description;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        companyName: company.value.company_name
      }, null, _parent));
      _push(`<div class="mx-auto max-w-6xl px-6 lg:flex lg:items-center lg:px-8"><div class="relative overflow-hidden bg-white"><div class="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true"><svg class="absolute top-12 left-full translate-x-32 transform" width="304" height="384" fill="none" viewBox="0 0 404 384"><defs><pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" class="text-gray-300" fill="currentColor"></rect></pattern></defs><rect width="304" height="584" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"></rect></svg></div><div class="md:flex justify-between bg-white rounded md:w-3/4"><img class="h-1/2 w-auto object-cover rounded-full lg:flex p-2 m-4"${ssrRenderAttr(
        "src",
        company.value.logo ? company.value.logo : ""
      )} alt=" Logo N/A"><hr class="h-2 bg-teal-300 w-full md:hidden"><div class="text-left pt-6 px-4 md:px-6"><h1 class="text-2xl lg:text-4xl font-medium text-gray-700">${ssrInterpolate(company.value.company_name)}</h1><div class="text-gray-700 py-2 text-md md:text-md">${companyDescription(company.value.description)}</div><div class="flex justify-start space-x-1 mt-2 mb-4"><div class="flex items-center space-x-2">`);
      if (_ctx.tag !== null) {
        _push(`<!--[-->`);
        ssrRenderList(unref(tags), (tag) => {
          _push(`<div class="flex items-center space-x-2"><span class="inline-flex items-center justify-center px-2 py-1 font-medium leading-4 text-gray-600 bg-gray-200 rounded-md text-xs md:text-sm">${ssrInterpolate(tag.name)}</span></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="bg-gray-50 lg:w-4/6 w-full mt-2 rounded-lg"><div class="md:flex justify-around px-8 py-4"><figcaption class="font-medium"><div class="text-gray-800">Founded</div><div class="text-gray-800">${ssrInterpolate(company.value.founded)}</div></figcaption><figcaption class="font-medium"><div class="text-gray-800">Location</div><div class="text-gray-800">${ssrInterpolate(company.value.location)}</div></figcaption><figcaption class="font-medium"><div class="text-gray-800">Team Size</div><div class="text-gray-800">${ssrInterpolate(company.value.team_size)}</div></figcaption><div class="font-medium"><div class="text-gray-100"><div class="text-green-800"> Socials <div class="flex space-x-2"><!--[-->`);
      ssrRenderList(socials, (social) => {
        _push(`<a${ssrRenderAttr("href", social.href)} class="text-gray-400 hover:text-gray-500"><span class="sr-only">${ssrInterpolate(social.name)}</span>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(social.icon), {
          class: "h-6 w-6",
          "aria-hidden": "true"
        }, null), _parent);
        _push(`</a>`);
      });
      _push(`<!--]--></div></div></div></div></div></div><div class="relative lg:pr-4 py-8 m-2"><div class="prose prose-lg prose-indigo lg:px-4 text-gray-700"><p><div class="text-gray-700 py-2 text-md md:text-md">${companyDescription(company.value.description)}</div><br><button class="bg-white hover:bg-teal-700 hover:text-gray-100 border border-teal-900 text-center font-bold py-1 px-8 my-4 items-center rounded-lg focus:outline-teal-800 focus:shadow-outline"><a${ssrRenderAttr("href", company.value.link)} class="no-underline text-teal-800 hover:text-gray-100" target="_blank">Wesbite</a></button></p></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/companies/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-3d37ce50.mjs.map
