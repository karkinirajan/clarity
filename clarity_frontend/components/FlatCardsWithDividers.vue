<template>
  <div class="px-4 py-4 bg-teal-50 border rounded-xl my-6 shadow-sm">
    <div class="relative">
      <input
        class="search__input w-full rounded-lg border-gray-400"
        type="text"
        @input="searchInputValue = $event.target.value.trim().toLowerCase()"
        :placeholder="filterWithCheckedValuesAndSearchInput || 'Type to filter...'"
        v-model="filter"
      />
    </div>
  </div>

  <div class="rounded-xl border border-gray-200 bg-white">
    <ul role="list" class="divide-y divide-gray-300">
      <li v-for="company in filteredItems" :key="company.id" class="py-4 px-1">
        <NuxtLink :to="`/companies/${company.id}/`">
          <div class="lg:flex block items-center justify-between">
            <div>
              <img
                class="h-auto w-auto object-cover rounded-full hidden lg:block mx-auto my-0 p-2"
                :src="company.logo ? company.logo : ''"
                alt="logo N/A"
              />
            </div>
            <div class="md:px-4 px-2">
              <p class="font-bold text-lg text-gray-700 hover:text-gray-600">
                <NuxtLink :to="`/companies/${company.id}`">{{
                  company.company_name
                }}</NuxtLink>
              </p>
              <div
                class="text-gray-600 py-2 text-sm md:text-md"
                v-html="companyDescription(company.description)"
              ></div>

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
    class="bg-teal-800 hover:bg-teal-700 text-white text-center font-bold py-3 px-12 m-4 items-center rounded focus:outline-none focus:shadow-outline"
    @click="loadMore"
  >
    Load More
  </button>
</template>
<script setup>
import { companyStore } from "~~/stores/CompanyStore.js";
import { computed, onMounted, ref } from "vue";

const store = companyStore();
const tags = store.tags;

const companyDescription = (description) => {
  if (description.length > 200) {
    return description.substring(0, 200) + "...";
  } else {
    return description;
  }
};

const filter = computed({
  get: () => store.filter,
  set: (value) => (store.filter = value),
});

onMounted(() => {
  store.fetchData();
  store.fetchTags();
});

const loadMore = () => {
  store.loadMore();
};

const props = defineProps({
  checkedValues: {
    type: Array,
    required: true,
  },
});

const checkedValues = computed(() => props.checkedValues);
const filteredItems = computed(() => {
  const checkedTags = checkedValues.value;
  const filteredCompanies = store.filteredItems.filter((company) => {
    return (
      checkedTags.every((tag) => company.tags.map((t) => t.name).includes(tag)) ||
      // do the same for subtags and regions

      checkedTags.every((tag) => company.subtags.map((t) => t.sub_tag).includes(tag)) ||
      // do the same for subtags and regions

      checkedTags.every((tag) => company.regions.map((t) => t.region).includes(tag))
    );
  });
  return filteredCompanies;
});

// define a reactive reference for the search input value
const searchInputValue = ref("");

// append the checkedValues with the existing filter and search input value
const filterWithCheckedValuesAndSearchInput = computed(() => {
  const checkedValuesValue = checkedValues.value.join(" ");

  let result = "";

  if (checkedValuesValue) {
    result += checkedValuesValue + " ";
  }

  return result.trim() || "Type to filter...";
});

onMounted(async () => {
  const response = await fetch(`http://35.153.67.2/api/tags/`);
  tags.value = await response.json();
});
</script>
