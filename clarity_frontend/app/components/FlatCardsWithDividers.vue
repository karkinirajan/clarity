<template>
  <div class="px-4 py-4 bg-teal-50 border rounded-xl my-6 shadow-sm">
    <div class="relative">
      <input
        class="search__input w-full rounded-lg border-gray-400"
        type="text"
        aria-label="Search companies"
        :placeholder="placeholder"
        v-model="search"
      />
    </div>
  </div>

  <div v-if="store.error" class="my-4 rounded-lg bg-red-50 p-4 text-red-700" role="alert">
    <p>{{ store.error }}</p>
    <button type="button" class="mt-2 font-medium underline" @click="store.fetchAll()">
      Try again
    </button>
  </div>
  <p v-else-if="store.loading" class="my-4 text-gray-600">Loading companies...</p>
  <p v-else-if="!store.filteredItems.length" class="my-4 text-gray-600">
    No companies match your search.
  </p>

  <div v-else class="rounded-xl border border-gray-200 bg-white">
    <ul role="list" class="divide-y divide-gray-300">
      <li v-for="company in store.visibleItems" :key="company.id" class="py-4 px-1">
        <NuxtLink :to="`/companies/${company.id}/`" class="block">
          <div class="lg:flex block items-center justify-between">
            <!-- a fixed box, so the text column starts at the same place whatever the logo's width -->
            <div class="hidden lg:flex h-24 w-24 shrink-0 items-center justify-center">
              <img
                v-if="company.logo"
                class="max-h-full max-w-full rounded-full object-contain p-2"
                :src="company.logo"
                :alt="`${company.company_name} logo`"
              />
            </div>
            <div class="md:px-4 px-2">
              <p class="font-bold text-lg text-gray-700 hover:text-gray-600">
                {{ company.company_name }}
              </p>
              <p class="text-gray-600 py-2 text-sm md:text-md">
                {{ preview(company) }}
              </p>

              <div class="flex items-center space-x-2">
                <div
                  v-for="tag in company.tags"
                  class="flex items-center space-x-2"
                  :key="tag.id"
                >
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 font-medium leading-4 text-gray-600 bg-gray-200 rounded-md text-xs md:text-sm"
                  >
                    {{ tag.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
  <button
    v-if="store.hasMore"
    class="bg-teal-800 hover:bg-teal-700 text-white text-center font-bold py-3 px-12 m-4 items-center rounded focus:outline-none focus:shadow-outline"
    @click="store.loadMore()"
  >
    Load More
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useCompanyStore } from "../stores/company.js";
import { excerpt } from "../utils/text.js";

const store = useCompanyStore();

const search = computed({
  get: () => store.search,
  set: (value) => store.setSearch(value),
});

// ticked filters are listed in the box when it is empty
const placeholder = computed(() => store.checked.join(" ") || "Type to filter...");

// text only: the description is HTML written in the admin, and cutting HTML at a fixed length
// can leave a tag open
const preview = (company) => excerpt(company.description || company.short_description, 200);
</script>
