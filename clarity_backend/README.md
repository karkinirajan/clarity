# Clarity backend

A Django REST API for a directory of companies, plus the admin site where the data is edited.

## Features

- Read-only JSON API: companies, tags, sub-tags, regions, socials, founders. Public, no login.
- Internal data (administrative notes, OpenAI prompts and drafts) is staff-only.
- Company descriptions are rich text written in the admin (CKEditor); the API sanitises the HTML (`nh3`) so it is safe to inject in a page.
- Admin with Jazzmin, CSV / Excel import and export (`django-import-export`).
- Optional drafting of descriptions with OpenAI, only for a new or changed prompt, never blocking a save.
- Management commands: `populate_db` (fake data for development), `import_logos` (download logos from a CSV).
- `/health/` (database check), OpenAPI schema with Swagger and Redoc, Docker image, nginx proxy.

## Quickstart

Requires [uv](https://docs.astral.sh/uv/).

```bash
uv sync                                    # Python 3.13 and the locked dependencies
export DEBUG=true                          # local work only (or put it in .env)
uv run python manage.py migrate
uv run python manage.py loaddata companies.json     # the 158 companies of the old database
uv run python manage.py createsuperuser
uv run python manage.py runserver          # http://localhost:8000, Swagger at /swagger/docs/
```

`docker compose up --build` runs the same with PostgreSQL; `docker compose run --rm test` runs the tests.

Fake data instead of the fixture: `uv run python manage.py populate_db 25 --seed 1`.
Logos: `uv run python manage.py import_logos logos.csv` (columns: id, logo URL, company name; the header row is skipped).

## Configuration

Settings come from environment variables (`manage.py` also loads a local `.env`; an empty value counts as unset). Demo values, which you can paste into `.env`:

```bash
SECRET_KEY=demo-secret-key-replace-me-0123456789abcdef0123456789abcdef   # required when DEBUG=false
DEBUG=true
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=
CORS_ALLOWED_ORIGINS=http://localhost:3000     # the web front-end
DATABASE_URL=                                  # empty: SQLite databases/db.sqlite3; or postgres://user:pass@host:5432/db
MEDIA_ROOT=                                    # default ./media   (uploaded logos)
STATIC_ROOT=                                   # default ./staticfiles
API_DOCS_ENABLED=                              # default: on when DEBUG=true
HTTPS_ONLY=true                                # false for a plain-HTTP deployment
HSTS_SECONDS=3600
OPENAI_API_KEY=                                # both needed to draft descriptions
OPENAI_MODEL=
OPENAI_TIMEOUT=30
LOG_LEVEL=INFO
```

With `DEBUG=false` the app refuses to start without `SECRET_KEY`, redirects HTTP to HTTPS, sets secure cookies and HSTS, and trusts `X-Forwarded-Proto` from the proxy. If the site is only reachable over plain HTTP, set `HTTPS_ONLY=false`, otherwise the secure session cookie is never sent back and nobody can sign in to the admin.

## API

| Endpoint | Who | Notes |
|---|---|---|
| `GET /api/companies/`, `/api/companies/<id>/` | anyone | `description` is sanitised HTML |
| `GET /api/tags/`, `/api/subtags/`, `/api/regions/`, `/api/socials/`, `/api/founders/`, `/api/founder-socials/` (+ `<id>/`) | anyone | rows carry a `company` id (socials: the company name) |
| `GET /api/admin-notes/`, `/api/openai-descriptions/` (+ `<id>/`) | staff (logged in to `/admin/`) | internal; anonymous callers get 403 |
| `GET /health/` | anyone | `{"status": "ok"}` or 503 when the database is unreachable |
| `/admin/` | staff | the editing tool |
| `/swagger/schema/`, `/swagger/docs/`, `/swagger/schema/redoc/` | anyone, when `API_DOCS_ENABLED` | |

Lists are not paginated (the front-end filters client-side); everything is read-only, there are no write endpoints.

## OpenAI descriptions

A *Generated Description* in the admin has a prompt. When it is saved with a new or changed prompt, the HTML of the prompt is stripped to text and sent to `OPENAI_MODEL`; the answer is stored in `generated_text`. If the key or the model is not set, or OpenAI does not answer (timeout, error), the record is saved without text and a warning is logged. The model name is deliberately not defaulted: set one that your account can use.

## Testing

```bash
uv run pytest -q                           # 120 tests, coverage of pages/ and clarity/
uv run ruff check . && uv run ruff format --check .
```

Tests use `clarity.settings_test` (in-memory SQLite, temporary media, nothing sent to OpenAI). They cover the permission rules (each internal endpoint is checked anonymously, as a normal user and as staff), the HTML sanitiser, the OpenAI behaviour with a fake client, both commands, every admin page, the settings in fresh interpreters (production refuses to start without a key and keeps `SecurityMiddleware`; hosts, CORS, database URL, HTTPS switch) and the URL / health behaviour.

## Deployment

`docker-compose-deploy.yml` builds the image (gunicorn on port 9000, `scripts/run.sh` runs `collectstatic` and `migrate`) and an nginx proxy on port 80 that serves `/static/` and `/media/` from a shared volume:

```bash
export DJANGO_SECRET_KEY=... DJANGO_ALLOWED_HOSTS=example.com DB_NAME=clarity DB_USER=clarity DB_PASS=...
export HTTPS_ONLY=false        # until TLS is in front of it
docker compose -f docker-compose-deploy.yml up -d --build
docker compose -f docker-compose-deploy.yml run --rm app python manage.py createsuperuser
```

Copy the logos (the old repository kept them in `media/company_logos/`) into the `web_data` volume at `/vol/web/media/company_logos/`.

## Known limits

- The editor is django-ckeditor, which bundles CKEditor 4.22, now unsupported; Django's `ckeditor.W001` check keeps saying so. The API sanitises its output, but moving to another editor is a decision for the project (CKEditor 5 has licence terms to check against Apache-2.0).
- `Company.founded` is a 4-digit decimal (a year) and the API returns it as a string.

## License

Apache License 2.0 (see the repository root).
