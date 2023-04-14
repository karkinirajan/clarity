import { d as defineStore } from "../server.mjs";
import "vue";
import "destr";
const companyStore = defineStore({
  id: "company",
  state: () => ({
    items: [],
    tag: [],
    tags: [],
    loading: true,
    filter: "",
    loadCount: 10
  }),
  actions: {
    fetchTags: async function() {
      const response = await fetch("http://35.153.67.2/api/tags/");
      this.tags = await response.json();
      this.loading = false;
    },
    fetchData: async function() {
      this.loading = true;
      const response = await fetch("http://35.153.67.2/api/companies/");
      this.items = await response.json();
      this.loading = false;
    },
    loadMore: async function() {
      this.loading = true;
      this.loadCount += 8;
      this.loading = false;
    }
  },
  getters: {
    filteredItems: function() {
      const keywords = this.filter.toLowerCase().split(" ");
      return this.items.filter((item) => {
        const text = item.company_name.toLowerCase() + " " + item.short_description.toLowerCase() + " " + item.description.toLowerCase();
        return keywords.every((keyword) => text.includes(keyword));
      }).slice(0, this.loadCount);
    }
  }
});
export {
  companyStore as c
};
//# sourceMappingURL=CompanyStore-da34e7fa.js.map
