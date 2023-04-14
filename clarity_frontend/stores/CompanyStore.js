export const companyStore = defineStore({
    id: "company",
    state: () => ({
        items: [],
        tags: [],
        subtags: [],
        regions: [],
        loading: true,
        filter: "",
        loadCount: 10,
    }),
    actions: {

        fetchTags: async function () {
            const response = await fetch("http://35.153.67.2/api/tags/");
            this.tags = await response.json();
        },
        fetchSubTags: async function () {
            const response = await fetch("http://35.153.67.2/api/subtags/");
            this.subtags = await response.json();
        },

        fetchRegions: async function () {
            const response = await fetch("http://35.153.67.2/api/regions/");
            this.regions = await response.json();
        },
        fetchData: async function () {
            this.loading = true;

            const [companies, tags, regions, subtags] = await Promise.all([
                fetch("http://35.153.67.2/api/companies/").then(response => response.json()),
                fetch("http://35.153.67.2/api/tags/").then(response => response.json()),
                fetch("http://35.153.67.2/api/regions/").then(response => response.json()),
                fetch("http://35.153.67.2/api/subtags/").then(response => response.json()),
            ]);

            companies.forEach(company => {
                company.tags = tags.filter(tag => tag.company === company.id);
            });

            companies.forEach(company => {
                company.regions = regions.filter(region => region.company === company.id);
            });

            companies.forEach(company => {
                company.subtags = subtags.filter(subtag => subtag.company === company.id);
            });

            this.items = companies;
            this.loading = false;
        },


        loadMore: async function () {
            this.loading = true;
            this.loadCount += 10;
            this.loading = false;

        },
    },
    getters: {
        filteredItems: function () {
            const keywords = this.filter.toLowerCase().split(" ");
            return this.items
                .filter((item) => {
                    const text =
                        item.company_name.toLowerCase() +
                        " " +
                        item.short_description.toLowerCase() +
                        " " +
                        item.description.toLowerCase();

                    return keywords.every((keyword) => text.includes(keyword));
                })
        },
    },

});
