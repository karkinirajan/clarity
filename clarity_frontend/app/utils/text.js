const ENTITIES = { "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };

/** Plain text of an HTML fragment (for search and previews; never inserted as HTML). */
export function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&(nbsp|amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity])
    .replace(/\s+/g, " ")
    .trim();
}

/** The first `max` characters of the text of `html`. The old cards cut the HTML itself at 200
 *  characters, which could leave a tag open and was then injected with v-html. */
export function excerpt(html, max = 200) {
  const text = stripHtml(html);
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}
