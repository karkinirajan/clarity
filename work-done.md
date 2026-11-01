# Work done: clarity

Branch: `chore/modernize` (local, not pushed). Date: 2026-11-01.

## What was there
Two projects in one repository: a Django 4.1.7 API (`clarity_backend`, Python 3.9 Docker image) and a Nuxt 3.1 web app (`clarity_frontend`). 3,880 files were tracked, but only about 60 were source. The rest was generated or runtime data: 1,482 files in `static/` and 1,478 in `staticfiles/` (collectstatic output, including copies of the admin, CKEditor and drf-yasg assets), 777 uploaded company logos in `media/` (many are duplicates such as `name_AbC123.png`, because every logo import saved a new file next to the old one), `.idea/` and `.vscode/`, the Nuxt build output (`.output/`, `.nuxt/`), and **the SQLite database** `databases/db.sqlite3` (158 companies, one superuser with its password hash, 6 live session keys, 178 admin-log rows). The backend had a 95-line pinned `requirements.txt` (pandas, numpy, pylint, black, a second admin theme set and so on), no tests for the API's access rules (the existing ones only exercised `Company`), deployment files that did not match the code, and a CI file in a folder GitHub never reads.

## Security problems found and fixed
| Problem | Effect | Fix |
|---|---|---|
| `SECRET_KEY` written in `settings.py`, `DEBUG = True`, a server IP address in `ALLOWED_HOSTS` | Anyone with the repository could forge sessions; debug pages on a live host | All from the environment; `DEBUG` off by default; the app refuses to start in production without `SECRET_KEY`. **The old key stays in git history: if that server ever used it, rotate it** |
| `if not DEBUG: del MIDDLEWARE[0]` (meant to drop the debug toolbar) | Deleted `SecurityMiddleware`, i.e. the HTTPS redirect, HSTS and `nosniff`, exactly in production | Removed; the toolbar is only added in debug mode when it is installed |
| Default permission `AllowAny` | `GET /api/admin-notes/` (internal notes on companies) and `GET /api/openai-descriptions/` (prompts and drafts) were readable by anyone | Default is now `IsAdminUser`; the public directory views opt in with `AllowAny`. Anonymous callers get 403, ordinary users 403, staff 200 |
| Session, **Basic** and Token authentication enabled (Token without the `authtoken` app) | Basic auth in the browsable API; dead configuration | Session authentication only |
| `CORS_ORIGIN_ALLOW_ALL = True` | Any website could call the API from a browser | Only `CORS_ALLOWED_ORIGINS` |
| The database with a superuser hash, session keys and the admin log committed to git | Account and session material in the repository | Untracked (still on your disk) and ignored. A fixture `pages/fixtures/companies.json` keeps the 158 companies, tags and regions (public data only). **Change the superuser's password and clear sessions** (`manage.py clearsessions`, or just rotate `SECRET_KEY`): the committed hash and session keys remain in history |
| Company descriptions (CKEditor HTML) injected with `v-html` on three pages, and the cards cut that HTML at 200 characters first | Stored XSS: markup saved in the admin could run script for every visitor, and truncated markup could break the page | The API sanitises `description` (`nh3`: no scripts, handlers, styles or `javascript:` links); cards show a plain-text excerpt; the company page shows the sanitised HTML |
| A catch-all URL answering every unknown path with the Swagger view | In production the `schema` URL does not exist, so every unknown URL was a 500 | Removed: unknown URLs are a plain 404 |
| `OPENAI_API_KEY` read at import into a module global; legacy completions call with no timeout | A slow or failing OpenAI made saves fail | Settings + `pages/services.py` with a timeout; failures are logged, not raised |
| The deploy compose took its secrets from loosely named variables; the nginx template had a server address written in | Deployment details in the repository | The deploy compose requires `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DB_*` (`${VAR:?}`); the nginx template has no address. (The development compose keeps the demo password `changeme`, for a throwaway local database) |

## Other bugs found and fixed
| Problem | Fix |
|---|---|
| `populate_db` ran `Faker()` calls on a tuple at import time, so the command could not even load; it also stored a URL in an image field and a date in a 4-digit decimal | Rewritten: companies with tags, sub-tags, regions, founders and a generated logo; `--seed` for repeatable data |
| `pages/resources.py` imported a model that does not exist | Fixed (the import-export resources load) |
| Admin search on companies used `company` as a search field (not a field): any search was a 500 | Fixed |
| `regions/<pk>/` was routed to the **list** view | Routed to the detail view |
| `custom_exception_handler` raised on any list-shaped error body | Only adds `status_code` to dict bodies |
| `OpenaiDescription.save()` called OpenAI on every save, with the editor's HTML in the prompt and the retired `text-davinci-003` engine | Asks only for a new or changed prompt, with the text of the prompt, via the chat completions API; model from `OPENAI_MODEL` |
| `upload_images_from_csv`: hard-coded `result.csv`, no timeout, no type or size check, left the old file behind | Management command `import_logos` (timeout, image types only, size limit, replaces the file) |
| An empty `DATABASE_URL` made `dj_database_url.config()` return `{}`; an empty `MEDIA_ROOT=` meant `.` | Every empty environment value counts as unset |
| Dockerfile copied a `requirements.dev.txt` that does not exist; compose mounted a `./app` that does not exist and passed `DB_*` variables the settings never read (always SQLite); nginx proxied to an undefined `backend` upstream; `proxy/run.sh` ended with stray text and would have wiped nginx's own `$host` variables with `envsubst` | Rewritten and checked with `docker compose config` (not built: see Verification) |
| CI was in `clarity_backend/.github/` (GitHub only reads the repository root) and ran `flake8`, which was not installed | Root `.github/workflows/ci.yml` |
| Frontend: the API address `http://localhost:8000` written into every page and store | `runtimeConfig` (`NUXT_PUBLIC_API_BASE` / `NUXT_API_BASE_SERVER`) |
| `filtersStore`: its `actions` were nested inside `state`, so it never worked, and the same code was copied into two pages | One Pinia store (`stores/company.js`) |
| "Load More" incremented a counter nothing read (all 158 companies always rendered) | Pages of ten, the button adds ten and hides when done |
| Ticking a tag and a region matched nothing (all ticked values had to come from the same list) | A company must have every ticked value, from any list |
| `description.length` on a missing description crashed the cards | Null-safe |
| Links inside links in the cards; a breadcrumb link with an undefined target; the company fetched twice (top-level `await fetch` in two components) | Fixed; data loaded once on the server and reused |
| `pages/index.vue` and `pages/companies/index.vue` were identical except for one line | One `CompanyDirectory` component |
| Desktop filter checkboxes used the database id as the DOM id: a tag, a sub-tag and a region can share an id, so a label could toggle another box | Ids qualified by the group (found with the browser pass) |
| Company page: the description was printed twice (the helper meant to shorten the intro returned the full text in both branches), "Wesbite", a `<a>` inside a `<button>`, social icons linking to `#` | Intro is the short description, "Website" is a proper link (absent without a URL), socials come from the company's real `Social` rows and are hidden when there are none |
| No page had a `<title>` or `<html lang>` | Titles per page (`%s \| Clarity`), `lang="en"` |
| The 404 page was a pasted template (comment, two links to `#`) and could not serve unknown URLs | `app/error.vue` for every error, inside the layout, with a working link home |
| A slow API meant a click that appeared to do nothing; no way to retry | Progress bar, `Loading companies...`, `Try again` |
| Logos of different widths shifted each card's text column; a decorative dot grid was clipped depending on the length of the text | Fixed-size logo box; full-width wrapper |
| `ecosystem.config.js` was ESM (pm2 cannot load it); `target` and `build.buildDir` are Nuxt 2 options | `ecosystem.config.cjs`; a current Nuxt 4 config |

## Changes by area
| Path | Before | Change |
|---|---|---|
| `clarity_backend/static/`, `staticfiles/`, `media/`, `databases/`, `.idea/`, `.vscode/` (also one at the root); `clarity_frontend/.output/`, `.nuxt/` | tracked (3,800+ files) | `git rm --cached` (kept on disk) and ignored by one root `.gitignore` |
| `clarity_backend/requirements.txt` | 95 pinned lines, Python 3.9 | `pyproject.toml` + `uv.lock` (Python 3.13); `requirements.txt` exported from the lock |
| `clarity_backend/clarity/settings.py`, `settings_test.py`, `urls.py`, `views.py` | see above | Environment-driven settings; test settings; health view; docs only when enabled |
| `clarity_backend/pages/` | | `services.py` (OpenAI), `sanitize.py`, permissions in `api_views.py`, fixed routes / admin / resources / exception handler, two management commands, `fixtures/companies.json` |
| `clarity_backend/nuxt_app/`, `templates/index.html`, `pages/views/views.py`, `proxy/uwsgi_params` | an empty app and templates that only served a landing page; an unused file | Deleted (nothing referenced them) |
| `clarity_backend/Dockerfile`, `docker-compose*.yml`, `proxy/`, `scripts/run.sh` | see above | Rewritten (uv, Python 3.13, non-root, PostgreSQL 17, shared volume with nginx) |
| `clarity_backend/tests/` | absent (the existing `pages/tests/` kept) | 8 test files plus `conftest.py`, 67 new tests |
| `clarity_frontend/` | Nuxt 3.1, files at the top level | Nuxt 4.6, everything under `app/`, runtime config, one store, composable, pure helpers, `error.vue`, Tailwind config as ESM |
| `clarity_frontend/package.json` | 14 dependencies + 6 dev dependencies, unused ones included | 7 + 5; lockfile regenerated |
| `clarity_frontend/tests/` | absent | 3 files, 23 tests |
| `.github/workflows/ci.yml` | absent at the root | Backend (lint, format, check, migration drift, tests), frontend (tests, build), both images |
| `LICENSE` (three copies) | | One at the root |
| READMEs, `VERSIONS.md`, `work-done.md` | generic READMEs | Written to match the code |

## Verification (actual runs)
- Backend: **120 tests pass** (53 existing, 67 new), **96% coverage** of `pages/` and `clarity/`. `ruff check` and `ruff format --check` clean, `manage.py check` reports only Django's own `ckeditor.W001` (left visible on purpose), `makemigrations --check` finds no drift.
- Mutation checks (each original defect put back, the suite must fail): default permission `AllowAny` (5 tests fail), no sanitising (1), admin search on a non-field (1), `SecurityMiddleware` deleted in production (1), regions detail routed to the list (2), OpenAI on every save (1).
- A production-style run without Docker: `collectstatic` (1,505 files), `migrate`, `loaddata` (171 objects), then a real gunicorn (2 workers) with `DEBUG` off behind `X-Forwarded-Proto: https`: health ok; plain HTTP redirects to HTTPS; 158 companies; the region detail is a single object; `admin-notes` and `openai-descriptions` anonymous: 403; WhiteNoise serves the admin CSS; an unknown URL 404; HSTS header present; unknown `Host` refused.
- Frontend: **23 Vitest tests** (text helpers, filter rules, the store: loading once, failure and retry, paging, filtering) and `nuxt build` pass.
- End to end with the real backend and the built Nuxt server, driven in a real Chromium (Playwright's own build, through `playwright-core`; the browser tools of this setup could not find a Chrome): all pages server-rendered with data; 10 cards then +10 per "Load More"; search, one and two combined filters, empty result; card to company page with breadcrumb; 404 for an unknown URL and a missing company with the layout; API-down message; client-side failure and retry with "Loading companies..." shown; progress bar during a slow navigation; titles and `lang`; no horizontal overflow at 1280, 768 and 375 px; the mobile filter dialog opens, expands, ticks and closes with Escape; every one of the first 16 tab stops shows a focus ring; text contrast between 6.1:1 and 21:1 on the checked pairs; no JavaScript errors in the console (the only console lines are the browser noting the two 404s requested on purpose). That pass found and fixed the checkbox ids, titles, `lang`, loading indicator, retry, the duplicated description, "Wesbite", placeholder socials, the clipped dot grid and the logo alignment.
- **Docker, run after the machine was rebooted:** the backend and proxy images build; `docker compose run --build --rm test` passes 120 tests inside the image (it found one test that assumed the checkout folder is called `clarity_backend`; fixed); the development stack runs on **PostgreSQL 17.11** (migrations, `loaddata` of the 171 objects, `/api/companies/` returns 158, `/health/` checks the database, the admin-notes endpoint is 403 for anonymous callers); the production-style stack (`docker-compose-deploy.yml` plus the real nginx image on the same network and volume) answers `/health/`, the API (158 companies), `/admin/login/` and `/static/admin/css/base.css` through nginx, the rendered nginx config keeps its own `$host` variables, and an unknown `Host` header is refused. Port 80 itself was not bound (rootless Docker), so the proxy was published on another port.
- **Not verified:** a real OpenAI call (a fake client is used); a GitHub Actions run; Firefox and Safari; screen-reader behaviour and `prefers-reduced-motion` (the only motion is Tailwind / Headless UI transitions, not checked); Node 22 (built and tested on 24.22.1 and 26.12.1).

## Needs your attention
- **Rotate or invalidate:** the old Django `SECRET_KEY` (in history; matters if that server used it) and the superuser's password and sessions. Those are in git history, and rewriting history is a push you have to do yourself.
- **The editor is end-of-life:** django-ckeditor bundles CKEditor 4.22 and Django's `ckeditor.W001` says so on every run. The output is sanitised, but replacing the editor is a decision for you (CKEditor 5 has licence terms to check against Apache-2.0).
- **Logos:** the 777 files are still in `clarity_backend/media/` on your disk (untracked). The fixture refers to them by path, so copy them to `MEDIA_ROOT` on the server. Many are duplicates of each other; `import_logos` no longer creates new duplicates.
- **Placeholder content I did not touch:** the hero text and the newsletter text are lorem ipsum; the newsletter form is not connected to anything (the "Notify me" button does nothing); 21 links on the company page (header, footer, template sections) point to `#`; the footer says 2023. They need real content or removal.
- **OpenAI:** set `OPENAI_MODEL` to a model your account can use; there is deliberately no default.
- **Plain-HTTP deployments:** the bundled nginx listens on port 80. Behind it, set `HTTPS_ONLY=false`, or the admin session cookie is never sent back.
- **Behaviour changes to know about:** "Load More" now works (and the filter resets the paging), ticked filters combine across tags, sub-tags and regions, the company description is sanitised (scripts, event handlers, inline styles and `javascript:` links are removed; basic formatting, links, images and tables stay), unknown URLs are a 404 instead of the Swagger page, and the `nuxt_app` Django app is gone.
- The API lists are not paginated (the front-end filters client-side); fine for 158 companies, revisit if the directory grows into the thousands.
- No data in the dataset has socials yet, so the Socials block is empty for every company until some are added in the admin.
- Nothing pushed. To publish: `git push -u origin chore/modernize`
