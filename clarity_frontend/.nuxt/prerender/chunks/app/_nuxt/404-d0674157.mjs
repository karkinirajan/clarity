import { mergeProps, useSSRContext } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs } from 'file:///home/kneeraazon/clarity_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8" }, _attrs))}><div class="mx-auto max-w-max"><main class="sm:flex"><p class="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">404</p><div class="sm:ml-6"><div class="sm:border-l sm:border-gray-200 sm:pl-6"><h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"> Page not found </h1><p class="mt-1 text-base text-gray-500"> Please check the URL in the address bar and try again. </p></div><div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"><a href="#" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Go back home</a><a href="#" class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Contact support</a></div></div></main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _404 as default };
//# sourceMappingURL=404-d0674157.mjs.map
