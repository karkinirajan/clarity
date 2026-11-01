# Clarity

A searchable directory of companies. A Django REST API holds the data (companies, tags, sub-tags, regions, founders, socials) and an admin for editing it; a Nuxt app shows it as a filterable list with a page per company.

| Part | What it is | Stack |
|---|---|---|
| [`clarity_backend/`](./clarity_backend) | Read-only JSON API, admin site, optional OpenAI helper that drafts descriptions | Python 3.13, Django 5.2 LTS, Django REST framework, SQLite or PostgreSQL |
| [`clarity_frontend/`](./clarity_frontend) | Server-rendered web app: directory with search and filters, company pages | Nuxt 4, Vue 3, Pinia, Tailwind CSS 3 |

## Features

- Public, read-only API for the directory (`/api/companies/`, `/api/tags/`, `/api/regions/`, ...), with OpenAPI docs.
- Staff-only admin (Jazzmin) with rich-text descriptions, CSV import/export, and internal notes on each company that only staff can read.
- The company description is sanitised on the way out, so editor markup can never run script in the web app.
- Web app: search box, tag / sub-tag / region filters (combinable), paged list with "Load More", company pages with breadcrumb, a branded 404 page.
- Health endpoint (`/health/`), Docker images, an nginx proxy, CI.

## Quickstart

You need [uv](https://docs.astral.sh/uv/) (Python 3.13) and Node 22 or newer.

```bash
# 1. the API on http://localhost:8000
cd clarity_backend
uv sync
DEBUG=true uv run python manage.py migrate
DEBUG=true uv run python manage.py loaddata companies.json     # 158 companies (optional)
DEBUG=true uv run python manage.py createsuperuser             # for /admin/
DEBUG=true uv run python manage.py runserver                   # Swagger at /swagger/docs/

# 2. the web app on http://localhost:3000
cd ../clarity_frontend
npm install
npm run dev
```

`DEBUG=true` is for local work only (it allows a built-in development secret key and serves uploaded files); put your values in `clarity_backend/.env` instead of typing it each time. With Docker: `docker compose up --build` in `clarity_backend/` starts the API with PostgreSQL.

## How the parts fit

```
browser ──► Nuxt server (SSR) ──► Django API ──► SQLite / PostgreSQL
   │              │                    │
   │              └─ NUXT_API_BASE_SERVER (address used while rendering)
   └─ NUXT_PUBLIC_API_BASE (address the browser calls), CORS_ALLOWED_ORIGINS on the API
```

Logos uploaded in the admin are files under `MEDIA_ROOT`; in production nginx serves them (`clarity_backend/proxy/`).

## Configuration

| Where | Variable | Default | Purpose |
|---|---|---|---|
| API | `SECRET_KEY` | none | Required unless `DEBUG=true` |
| API | `DEBUG` | `false` | Development mode |
| API | `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, `CORS_ALLOWED_ORIGINS` | `localhost,127.0.0.1`, empty, `http://localhost:3000` | Comma-separated |
| API | `DATABASE_URL` | SQLite `databases/db.sqlite3` | e.g. `postgres://user:pass@host:5432/db` |
| API | `MEDIA_ROOT`, `STATIC_ROOT` | `./media`, `./staticfiles` | Uploaded logos, collected static files |
| API | `HTTPS_ONLY`, `HSTS_SECONDS` | `true`, `3600` | Redirect to HTTPS, secure cookies, HSTS when `DEBUG=false`. Use `false` for a plain-HTTP deployment |
| API | `API_DOCS_ENABLED` | `DEBUG` | Swagger / Redoc under `/swagger/` |
| API | `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_TIMEOUT` | empty, empty, `30` | Drafting descriptions; both key and model are needed, otherwise nothing is sent |
| Web | `NUXT_PUBLIC_API_BASE` | `http://localhost:8000/api` | API address the browser uses |
| Web | `NUXT_API_BASE_SERVER` | empty | API address the Node server uses while rendering (for example `http://app:9000/api` inside Docker); empty means the public one |

An empty value counts as unset. The full list with demo values is in [`clarity_backend/README.md`](./clarity_backend/README.md#configuration) (a real `.env.example` could not be written in this setup).

## Project structure

```
clarity/
├── clarity_backend/
│   ├── clarity/            Django project: settings, urls, health view, settings_test
│   ├── pages/              the directory app
│   │   ├── models.py  serializers.py  sanitize.py  services.py
│   │   ├── views/api_views.py  urls.py  admin.py  resources.py
│   │   ├── management/commands/  populate_db, import_logos
│   │   ├── fixtures/companies.json   the 158 companies of the old database
│   │   └── migrations/  tests/       (unit tests of models, serializers, views)
│   ├── tests/              permissions, sanitiser, OpenAI, commands, admin, settings, URLs
│   ├── proxy/              nginx image (static, media, reverse proxy)
│   ├── scripts/run.sh      container entry point (collectstatic, migrate, gunicorn)
│   └── Dockerfile  docker-compose.yml  docker-compose-deploy.yml  pyproject.toml  uv.lock
├── clarity_frontend/
│   ├── app/                components, pages, layouts, stores, composables, utils, error.vue
│   ├── tests/              Vitest tests (helpers and the store)
│   └── nuxt.config.ts  package.json  tailwind.config.js  ecosystem.config.cjs
├── .github/workflows/ci.yml
├── VERSIONS.md   work-done.md
└── LICENSE
```

## Testing

```bash
cd clarity_backend  && uv run pytest -q                      # 120 tests, 96% coverage
cd clarity_backend  && uv run ruff check . && uv run ruff format --check .
cd clarity_frontend && npm test                               # 23 tests
cd clarity_frontend && npm run build
```

CI (`.github/workflows/ci.yml`) runs all of this plus a build of the Docker images.

## Deployment

`clarity_backend/docker-compose-deploy.yml` runs gunicorn, PostgreSQL and nginx (port 80):

```bash
cd clarity_backend
export DJANGO_SECRET_KEY=... DJANGO_ALLOWED_HOSTS=example.com DB_NAME=clarity DB_USER=clarity DB_PASS=...
export HTTPS_ONLY=false        # while the site is reachable over plain HTTP only
docker compose -f docker-compose-deploy.yml up -d --build
```

The Nuxt app is built with `npm run build` and served with `npm start` (or `pm2 start ecosystem.config.cjs`).

## Versions

[VERSIONS.md](./VERSIONS.md). What changed, what was found, and what still needs your attention: [work-done.md](./work-done.md).

## License

Apache License 2.0, see [LICENSE](./LICENSE).
