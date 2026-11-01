/**
 * Thin client for the Clarity API. The base URL comes from the runtime config, so the same build
 * runs against any backend (NUXT_PUBLIC_API_BASE / NUXT_API_BASE_SERVER), and while the server
 * renders a page it may use an address that only exists inside the server's network.
 */
export function useApi() {
  const config = useRuntimeConfig();
  const baseURL =
    import.meta.server && config.apiBaseServer ? config.apiBaseServer : config.public.apiBase;
  return {
    get: (path, options = {}) => $fetch(path, { baseURL, ...options }),
  };
}
