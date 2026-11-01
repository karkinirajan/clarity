// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-11-01",
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  // Every page used to have an empty <title> and no lang attribute.
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: "%s | Clarity",
    },
  },
  // The Clarity API. Both can be set at run time: NUXT_PUBLIC_API_BASE (what the browser calls) and
  // NUXT_API_BASE_SERVER (what the Node server calls while rendering, e.g. http://app:9000/api
  // inside a Docker network). The old code had http://localhost:8000 written into every page.
  runtimeConfig: {
    apiBaseServer: "",
    public: {
      apiBase: "http://localhost:8000/api",
    },
  },
});
