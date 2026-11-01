import { describe, expect, it } from "vitest";
import { excerpt, stripHtml } from "../app/utils/text.js";

describe("stripHtml", () => {
  it("returns the text of a fragment", () => {
    expect(stripHtml("<p>Hello <strong>world</strong>&nbsp;&amp; co</p>")).toBe("Hello world & co");
  });
  it.each([null, undefined, ""])("handles %j", (value) => {
    expect(stripHtml(value)).toBe("");
  });
  it("leaves nothing that could be markup once it is rendered as text", () => {
    expect(stripHtml("<script>alert(1)</script>ok")).not.toContain("<");
  });
});

describe("excerpt", () => {
  it("keeps short text whole", () => {
    expect(excerpt("<p>short</p>", 50)).toBe("short");
  });
  it("cuts the text, not the markup", () => {
    const html = `<p>${"word ".repeat(100)}</p>`;
    const cut = excerpt(html, 200);
    expect(cut.length).toBeLessThanOrEqual(201);
    expect(cut.endsWith("…")).toBe(true);
    expect(cut).not.toContain("<");
  });
  it("does not crash on a missing description (the old card did)", () => {
    expect(excerpt(null)).toBe("");
  });
});
