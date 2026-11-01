import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

const get = vi.fn();
vi.mock("../app/composables/useApi.js", () => ({ useApi: () => ({ get }) }));

const { PAGE_SIZE, useCompanyStore } = await import("../app/stores/company.js");

const companies = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  company_name: `Company ${i + 1}`,
  short_description: null,
  description: i === 0 ? "<p>Robots for warehouses</p>" : null,
}));
const tags = [
  { id: 1, name: "AI", company: 1 },
  { id: 2, name: "AI", company: 2 },
];
const subtags = [{ id: 1, sub_tag: "Vision", company: 1 }];
const regions = [{ id: 1, region: "Europe", company: 1 }];

function answer(path) {
  return {
    "/companies/": companies,
    "/tags/": tags,
    "/subtags/": subtags,
    "/regions/": regions,
  }[path];
}

beforeEach(() => {
  setActivePinia(createPinia());
  get.mockReset();
  get.mockImplementation(async (path) => answer(path));
});

describe("fetchAll", () => {
  it("loads everything once and attaches tags, sub-tags and regions to each company", async () => {
    const store = useCompanyStore();
    await store.fetchAll();
    await store.fetchAll();
    expect(get).toHaveBeenCalledTimes(4); // the second call did nothing
    expect(store.items).toHaveLength(25);
    expect(store.items[0].tags.map((t) => t.name)).toEqual(["AI"]);
    expect(store.items[0].subtags).toHaveLength(1);
    expect(store.items[0].regions[0].region).toBe("Europe");
    expect(store.items[2].tags).toEqual([]);
    expect(store.loaded).toBe(true);
    expect(store.loading).toBe(false);
  });

  it("reports a failure instead of throwing", async () => {
    get.mockRejectedValue(new Error("network down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const store = useCompanyStore();
    await store.fetchAll();
    expect(store.error).toMatch(/could not be loaded/);
    expect(store.loaded).toBe(false);
    expect(store.loading).toBe(false);
  });

  it("can retry after a failure", async () => {
    get.mockRejectedValueOnce(new Error("blip"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const store = useCompanyStore();
    await store.fetchAll();
    get.mockImplementation(async (path) => answer(path));
    await store.fetchAll();
    expect(store.error).toBeNull();
    expect(store.items).toHaveLength(25);
  });
});

describe("paging", () => {
  it("shows a page at a time and Load More adds the next one (the button used to do nothing)", async () => {
    const store = useCompanyStore();
    await store.fetchAll();
    expect(store.visibleItems).toHaveLength(PAGE_SIZE);
    expect(store.hasMore).toBe(true);
    store.loadMore();
    store.loadMore();
    expect(store.visibleItems).toHaveLength(25);
    expect(store.hasMore).toBe(false);
  });

  it("starts again from the first page when the search or the filters change", async () => {
    const store = useCompanyStore();
    await store.fetchAll();
    store.loadMore();
    store.setSearch("company");
    expect(store.visibleCount).toBe(PAGE_SIZE);
    store.loadMore();
    store.setChecked(["AI"]);
    expect(store.visibleCount).toBe(PAGE_SIZE);
  });
});

describe("filtering", () => {
  it("searches names and description text", async () => {
    const store = useCompanyStore();
    await store.fetchAll();
    store.setSearch("warehouses");
    expect(store.filteredItems.map((c) => c.id)).toEqual([1]);
    store.setSearch("company 2");
    expect(store.filteredItems.map((c) => c.id)).toEqual([2, 12, 20, 21, 22, 23, 24, 25]);
  });

  it("combines ticked filters with the search", async () => {
    const store = useCompanyStore();
    await store.fetchAll();
    store.setChecked(["AI", "Europe"]);
    expect(store.filteredItems.map((c) => c.id)).toEqual([1]);
    store.setChecked(["AI"]);
    expect(store.filteredItems.map((c) => c.id)).toEqual([1, 2]);
    store.setSearch("nothing like this");
    expect(store.filteredItems).toEqual([]);
  });

  it("builds the sidebar groups from the loaded data", async () => {
    const store = useCompanyStore();
    await store.fetchAll();
    expect(store.filterGroups.map((g) => g.options.length)).toEqual([1, 1, 1]);
  });
});
