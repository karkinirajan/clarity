import { stripHtml } from "./text.js";

/** Words typed in the search box must all appear in the company's name or descriptions. Missing
 *  descriptions are fine (they are optional in the API; the old code crashed on them). */
export function matchesSearch(company, search) {
  const words = (search || "").toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = [company.company_name, company.short_description, stripHtml(company.description)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return words.every((word) => text.includes(word));
}

/** Every ticked value must be one of the company's tags, sub-tags or regions. (The old code
 *  required them all to come from the *same* list, so ticking a tag and a region matched nothing.) */
export function matchesChecked(company, checked) {
  if (!checked?.length) return true;
  const own = new Set([
    ...(company.tags || []).map((tag) => tag.name),
    ...(company.subtags || []).map((subtag) => subtag.sub_tag),
    ...(company.regions || []).map((region) => region.region),
  ]);
  return checked.every((value) => own.has(value));
}

/** One checkbox group per kind, one option per distinct value (the same tag name is stored once
 *  per company). */
export function buildFilterGroups({ tags = [], subtags = [], regions = [] }) {
  const group = (id, rows, field) => {
    const seen = new Map();
    for (const row of rows) {
      if (row[field] && !seen.has(row[field])) {
        seen.set(row[field], { id: row.id, value: row[field], label: row[field] });
      }
    }
    return { id, name: id, options: [...seen.values()] };
  };
  return [
    group("Tags", tags, "name"),
    group("Subtags", subtags, "sub_tag"),
    group("Regions", regions, "region"),
  ];
}
