<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div class="mx-auto max-w-max">
        <main class="sm:flex">
          <p class="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
            {{ status }}
          </p>
          <div class="sm:ml-6">
            <div class="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {{ notFound ? "Page not found" : "Something went wrong" }}
              </h1>
              <p class="mt-1 text-base text-gray-500">
                {{
                  notFound
                    ? "Please check the URL in the address bar and try again."
                    : "Please try again in a moment."
                }}
              </p>
            </div>
            <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <button
                type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="clearError({ redirect: '/' })"
              >
                Go back home
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Nuxt renders this for every error: unknown URLs, a missing company, a failed render.
const props = defineProps({ error: { type: Object, required: true } });

const status = computed(() => props.error?.statusCode ?? 500);
const notFound = computed(() => status.value === 404);

useSeoMeta({ title: () => (notFound.value ? "Page not found" : "Something went wrong") });
</script>
