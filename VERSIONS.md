# Versions

Read from `clarity_backend/uv.lock`, `clarity_frontend/package-lock.json` (installed versions), the Dockerfiles and `docker-compose*.yml` on 2026-11-01. To change one, edit the file named in the last column and run the tests.

## Runtime

| Component | Version | Where it is set |
|---|---|---|
| Python | 3.13 (image `python:3.13-slim-trixie`; was 3.9 in the old Dockerfile) | `clarity_backend/.python-version`, `pyproject.toml`, `Dockerfile` |
| Node | 24 recommended, `>=22` required (built and tested on 24.22.1 and 26.12.1) | `clarity_frontend/.nvmrc`, `package.json` (`engines`) |
| uv (in the image) | 0.13.6 | `clarity_backend/Dockerfile` |
| PostgreSQL | 17 (image `postgres:17-alpine`; was 13) | `docker-compose*.yml` |
| nginx | `nginxinc/nginx-unprivileged:1-alpine` | `clarity_backend/proxy/Dockerfile` |
| SQLite | the one bundled with Python (default database) | |

## Backend packages (locked)

| Package | Locked | Was (`requirements.txt`) | Notes |
|---|---|---|---|
| Django | 5.2.18 (LTS) | 4.1.7 | |
| djangorestframework | 3.18.3 | 3.14.0 | |
| drf-spectacular | 0.30.0 | 0.25.1 | |
| django-cors-headers | 4.9.0 | 3.14.0 | |
| django-ckeditor | 6.7.4 | 6.5.1 | bundles CKEditor 4.22 (unsupported, Django's `ckeditor.W001` stays visible) |
| django-import-export | 4.4.4 | 3.1.0 | |
| django-jazzmin | 3.0.5 | 2.6.0 | |
| openai | 3.42.0 | 0.26.5 | legacy `Completion` / `text-davinci-003` replaced by chat completions |
| nh3 | 0.3.7 | absent | HTML sanitiser for the descriptions |
| dj-database-url | 3.1.2 | absent | `DATABASE_URL` |
| whitenoise | 6.12.0 | 5.3.0 | |
| gunicorn | 26.2.0 | 20.1.0 | |
| psycopg | 3.3.6 | `psycopg2` 2.9.6 and `psycopg2-binary` 2.9.1 (both) | |
| Pillow | 13.0.0 | 9.4.0 | |
| requests | 2.34.2 | 2.27.1 | |
| python-dotenv | 1.2.4 | 1.0.0 | |

Dev group: `pytest`, `pytest-django`, `pytest-cov`, `ruff`, `faker`, `django-debug-toolbar`.

Removed because nothing used them: `drf-yasg`, `djangorestframework-simplejwt` (no endpoint issued tokens), `django-crispy-forms`, `crispy-bootstrap5`, `django-widget-tweaks`, `django-extensions`, `django-pytest`, `pandas`, `numpy`, `aiohttp` and the packages it needed, `black`, `pylint`, `astroid`, `isort`, and the long list of pinned transitive packages (the backend lock now resolves 61 packages, dev tools included).

## Frontend packages (installed)

| Package | Installed | Was (`package.json` range) |
|---|---|---|
| nuxt | 4.6.3 | `^3.1.0` |
| vue | 3.5.44 | `latest` override |
| vue-router | 5.4.0 | bundled |
| pinia | 4.1.0 | `^2.0.30` |
| @pinia/nuxt | 1.0.3 | `^0.4.6` |
| @nuxtjs/tailwindcss | 6.14.0 | `^6.3.0` |
| tailwindcss | 3.4.19 | `^3.2.4` |
| @tailwindcss/forms | 0.5.11 | `^0.5.3` |
| @tailwindcss/typography | 0.5.20 | `^0.5.9` |
| @headlessui/vue | 1.7.23 | `^1.7.8` |
| @heroicons/vue | 2.2.0 | `^2.0.14` |
| vitest (dev) | 5.0.5 | absent |

Removed because nothing used them: `axios`, `cors`, `codemirror`, `headlessui` (a 0.0.0 stub), `@ckeditor/*` (three packages), `@blowstack/ckeditor-nuxt`, `@nuxt/postcss8`, `autoprefixer`, `postcss`.

## Verified here (Docker, 2026-11-01)

The backend image and the nginx image build; the development compose stack runs on PostgreSQL 17.11 (migrations, the 158-company fixture, the API); `docker compose run --build --rm test` passes 120 tests; the production-style stack (gunicorn, PostgreSQL, the nginx image) answers pages, the API and static files through the proxy.

## Not verified here

- The OpenAI model name is deliberately left for you to set; no default was verified against a live account.
