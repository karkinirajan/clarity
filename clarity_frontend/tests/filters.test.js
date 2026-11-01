import { describe, expect, it } from "vitest";
import { buildFilterGroups, matchesChecked, matchesSearch } from "../app/utils/filters.js";

const acme = {
  id: 1,
  company_name: "Acme Robotics",
  short_description: "Builds robots",
  description: "<p>Warehouse <b>automation</b></p>",
  tags: [{ name: "AI" }],
  subtags: [{ sub_tag: "Vision" }],
  regions: [{ region: "Europe" }],
};
const bare = { id: 2, company_name: "Bare Co", short_description: null, description: null };

describe("matchesSearch", () => {
  it("matches every word, in any order, ignoring case", () => {
    expect(matchesSearch(acme, "robotics ACME")).toBe(true);
    expect(matchesSearch(acme, "robotics nothing")).toBe(false);
  });
  it("searches the description text, not its markup", () => {
    expect(matchesSearch(acme, "automation")).toBe(true);
    expect(matchesSearch(acme, "<b>")).toBe(false);
  });
  it("accepts an empty search and companies without descriptions", () => {
    expect(matchesSearch(acme, "")).toBe(true);
    expect(matchesSearch(acme, undefined)).toBe(true);
    expect(matchesSearch(bare, "bare")).toBe(true);
    expect(matchesSearch(bare, "robots")).toBe(false);
  });
});

describe("matchesChecked", () => {
  it("passes everything when nothing is ticked", () => {
    expect(matchesChecked(acme, [])).toBe(true);
    expect(matchesChecked(bare, undefined)).toBe(true);
  });
  it("accepts a tag, a sub-tag and a region together", () => {
    expect(matchesChecked(acme, ["AI", "Europe"])).toBe(true); // matched nothing before
    expect(matchesChecked(acme, ["AI", "Vision", "Europe"])).toBe(true);
  });
  it("requires every ticked value", () => {
    expect(matchesChecked(acme, ["AI", "Asia"])).toBe(false);
    expect(matchesChecked(bare, ["AI"])).toBe(false);
  });
});

describe("buildFilterGroups", () => {
  it("lists each distinct value once", () => {
    const groups = buildFilterGroups({
      tags: [
        { id: 1, name: "AI", company: 1 },
        { id: 2, name: "AI", company: 2 },
        { id: 3, name: "Bio", company: 2 },
      ],
      subtags: [{ id: 4, sub_tag: "Vision", company: 1 }],
      regions: [],
    });
    expect(groups.map((g) => g.id)).toEqual(["Tags", "Subtags", "Regions"]);
    expect(groups[0].options.map((o) => o.value)).toEqual(["AI", "Bio"]);
    expect(groups[1].options[0]).toEqual({ id: 4, value: "Vision", label: "Vision" });
    expect(groups[2].options).toEqual([]);
  });
});
