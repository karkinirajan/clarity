# Clarity frontend

The web app of Clarity: a server-rendered Nuxt 4 application that shows the company directory from the [Clarity API](../clarity_backend).

## Features

- Directory with a search box and tag / sub-tag / region filters. Ticked filters combine (a company must have all of them), and search words must all match the name or the description text.
- Paged list: ten companies at a time, "Load More" adds the next ten; the page resets when the search or the filters change.
- Company page: logo, summary, tags, founded / location / team size, the full description, social links (only the ones stored for the company) and the website.
- Pages are rendered on the server (real titles, `lang`, content for search engines); the browser reuses the data instead of fetching it again.
- States: a progress bar while a page loads, "Loading companies...", an error message with *Try again*, "No companies match your search", and a branded 404 page for unknown URLs and missing companies.
- Mobile layout with a slide-over filter panel.

## Quickstart

Requires Node 22 or newer (`.nvmrc` says 24) and a running API (see the backend README).

```bash
npm install
npm run dev          # http://localhost:3000
```

## Configuration

The API address is runtime configuration (nothing is compiled in), so one build works against any backend:

| Variable | Default | Purpose |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:8000/api` | Address the browser calls |
| `NUXT_API_BASE_SERVER` | empty | Address the Node server calls while rendering, for example `http://app:9000/api` inside a Docker network. Empty: the public one |

The API must list the site's origin in its `CORS_ALLOWED_ORIGINS`.

## Scripts

| Command | |
|---|---|
| `npm run dev` | development server |
| `npm run build` | production build into `.output/` |
| `npm start` | run the build (`node .output/server/index.mjs`, port 3000, `PORT`/`HOST` to change) |
| `pm2 start ecosystem.config.cjs` | the same under pm2 |
| `npm run generate` | static export (the directory data is fetched at build time) |
| `npm test` | Vitest |

## Project structure

```
app/
├── components/   CompanyDirectory (the page body), FlatCardsWithDividers (search + list),
│                 SubPageMenu (breadcrumb), Header, Footer, Hero, Newsletter
├── pages/        index, companies/index, companies/[id], about
├── layouts/      default
├── stores/       company.js   one Pinia store: data, search, filters, paging
├── composables/  useApi.js    the API client (reads the runtime config)
├── utils/        text.js, filters.js   pure helpers
└── error.vue     the error / 404 page
tests/            Vitest: text helpers, filter logic, the store (with a fake API)
```

The home page and `/companies` are the same directory; the home page adds the hero banner.

## Testing

```bash
npm test      # 23 tests: text helpers, filtering rules, the store (loading, retry, paging, filters)
npm run build
```

The pure logic lives in `utils/` and the store imports only Pinia and the API composable, so it is tested without a browser.

## Notes

- Descriptions are HTML written in the admin. The API sanitises it; the company page shows it with `v-html`, the list shows a plain-text excerpt.
- Tailwind is on version 3 (`@nuxtjs/tailwindcss` 6); moving to Tailwind 4 changes how it is wired into Nuxt and is a separate piece of work.
- The header, hero and newsletter blocks are template copy (lorem ipsum, links to `#`, a newsletter form that is not connected to anything); see `work-done.md`.
