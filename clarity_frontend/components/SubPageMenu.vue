<template>
  <div class="container-fluid flex justify-start mx-auto md:px-80 bg-gray-50">
    <nav class="flex" aria-label="Breadcrumb">
      <ol role="list" class="flex space-x-4 bg-gray-50 px-6 broder-2">
        <li class="flex">
          <div class="flex items-center">
            <NuxtLink
              to="/"
              class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
            >
              <HomeIcon class="w-6 flex-shrink-0" aria-hidden="true" />
              <span class="sr-only">Home</span></NuxtLink
            >
          </div>
        </li>
        <li v-for="page in pages" :key="page.name" class="flex">
          <div class="flex items-center">
            <svg
              class="h-full w-6 flex-shrink-0 text-gray-600"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <NuxtLink
              :to="page.href"
              class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
              :aria-current="page.current ? 'page' : undefined"
              >{{ page.name }}</NuxtLink
            >
            <svg
              class="h-full w-6 flex-shrink-0 text-gray-600"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <NuxtLink
              :to="page.href_and_company_name"
              class="ml-4 text-sm font-medium text-gray-700 hover:text-gray-700"
              :aria-current="page.current ? 'page' : undefined"
              >{{ company.company_name }}</NuxtLink
            >
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/20/solid";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const company = await fetch(
  `http://localhost:8000/api/companies/${route.params.id}/`
).then((response) => response.json());

const pages = computed(() => {
  return [{ name: "Companies", href: "/companies", current: false }];
});
</script>
