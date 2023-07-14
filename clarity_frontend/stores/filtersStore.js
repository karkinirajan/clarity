
export const useFiltersStore = defineStore({
    id: 'filters',
    state: () => ({
        filters: [],
        selectedFilters: [],
        mobileFiltersOpen: false,

        actions: {
            async fetchFilters() {
                const response1 = await fetch("http://localhost:8000/api/tags/");
                const response2 = await fetch("http://localhost:8000/api/subtags/");
                const response3 = await fetch("http://localhost:8000/api/regions/");
                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();
                this.filters = [
                    {
                        id: "Tags",
                        name: "Tags",
                        options: data1.map((tag) => ({
                            id: tag.id,
                            value: tag.name,
                            label: tag.name,
                            selected: false,
                        })),
                    },
                    {
                        id: "Subtags",
                        name: "Subtags",
                        options: data2.map((subtag) => ({
                            id: subtag.id,
                            value: subtag.sub_tag,
                            label: subtag.sub_tag,
                            selected: false,
                        })),
                    },
                    {
                        id: "Regions",
                        name: "Regions",
                        options: data3.map((region) => ({
                            id: region.id,
                            value: region.name,
                            label: region.name,
                            selected: false,
                        })),
                    },
                ];
            },
        }
    })
})

