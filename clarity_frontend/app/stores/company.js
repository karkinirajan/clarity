import { defineStore } from "pinia";
import { useApi } from "../composables/useApi.js";
import { buildFilterGroups, matchesChecked, matchesSearch } from "../utils/filters.js";

export const PAGE_SIZE = 10;

/** Companies with their tags / sub-tags / regions attached, plus the search and filter state. */
export const useCompanyStore = defineStore("company", {
  state: () => ({
    items: [],
    tags: [],
    subtags: [],
    regions: [],
    loading: false,
    loaded: false,
    error: null,
    search: "",
    checked: [],
    visibleCount: PAGE_SIZE,
  }),
  getters: {
    filterGroups: (state) => buildFilterGroups(state),
    filteredItems: (state) =>
      state.items.filter(
        (company) => matchesChecked(company, state.checked) && matchesSearch(company, state.search)
      ),
    visibleItems() {
      return this.filteredItems.slice(0, this.visibleCount);
    },
    hasMore() {
      return this.visibleCount < this.filteredItems.length;
    },
  },
  actions: {
    async fetchAll() {
      if (this.loaded) return;
      this.loading = true;
      this.error = null;
      try {
        const api = useApi();
        const [companies, tags, subtags, regions] = await Promise.all([
          api.get("/companies/"),
          api.get("/tags/"),
          api.get("/subtags/"),
          api.get("/regions/"),
        ]);
        this.tags = tags;
        this.subtags = subtags;
        this.regions = regions;
        this.items = companies.map((company) => ({
          ...company,
          tags: tags.filter((row) => row.company === company.id),
          subtags: subtags.filter((row) => row.company === company.id),
          regions: regions.filter((row) => row.company === company.id),
        }));
        this.loaded = true;
      } catch (error) {
        this.error = "The companies could not be loaded. Please try again.";
        console.error("Clarity API request failed:", error);
      } finally {
        this.loading = false;
      }
    },
    setSearch(value) {
      this.search = value;
      this.visibleCount = PAGE_SIZE;
    },
    setChecked(values) {
      this.checked = values;
      this.visibleCount = PAGE_SIZE;
    },
    loadMore() {
      this.visibleCount += PAGE_SIZE;
    },
  },
});
