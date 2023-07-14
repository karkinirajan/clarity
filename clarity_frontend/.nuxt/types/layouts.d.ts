import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/home/kneeraazon/Clarity/clarity_frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}