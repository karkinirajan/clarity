"""Settings are evaluated at import, so each case runs in a fresh interpreter."""

import json
import os
import re
import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

PRINT = """
import json
from django.conf import settings
print(json.dumps({
    "debug": settings.DEBUG,
    "hosts": settings.ALLOWED_HOSTS,
    "middleware": settings.MIDDLEWARE,
    "ssl_redirect": getattr(settings, "SECURE_SSL_REDIRECT", False),
    "secure_cookies": [settings.SESSION_COOKIE_SECURE, settings.CSRF_COOKIE_SECURE],
    "hsts": getattr(settings, "SECURE_HSTS_SECONDS", 0),
    "proxy_header": getattr(settings, "SECURE_PROXY_SSL_HEADER", None),
    "cors": settings.CORS_ALLOWED_ORIGINS,
    "cors_all": getattr(settings, "CORS_ALLOW_ALL_ORIGINS", False)
        or getattr(settings, "CORS_ORIGIN_ALLOW_ALL", False),
    "engine": settings.DATABASES["default"]["ENGINE"],
    "db_name": str(settings.DATABASES["default"]["NAME"]),
    "docs": settings.API_DOCS_ENABLED,
    "permission": settings.REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"],
    "csrf": settings.CSRF_TRUSTED_ORIGINS,
    "media_root": str(settings.MEDIA_ROOT),
    "static_root": str(settings.STATIC_ROOT),
    "openai_timeout": settings.OPENAI_TIMEOUT,
}))
"""


def run(code=PRINT, **env):
    environment = {
        "PATH": os.environ.get("PATH", ""),
        "PYTHONPATH": str(BASE_DIR),
        "DJANGO_SETTINGS_MODULE": "clarity.settings",
        "SECRET_KEY": "",
        "DEBUG": "false",
        "DATABASE_URL": "",
    }
    environment.update(env)
    return subprocess.run(
        [sys.executable, "-c", code],
        env=environment,
        cwd=BASE_DIR,
        capture_output=True,
        text=True,
        timeout=120,
    )


def values(**env):
    result = run(**env)
    assert result.returncode == 0, result.stderr
    return json.loads(result.stdout.strip().splitlines()[-1])


def test_production_refuses_to_start_without_a_secret_key():
    result = run()
    assert result.returncode != 0 and "SECRET_KEY" in result.stderr


def test_no_secret_key_is_written_in_the_settings_file():
    # (the only literal is the development fallback, which starts with django-insecure-)
    source = (BASE_DIR / "clarity" / "settings.py").read_text()
    assert not re.search(r"""SECRET_KEY\s*=\s*["'](?!django-insecure-)[^"']{20,}["']""", source)


def test_security_middleware_stays_in_production():
    """``del MIDDLEWARE[0]`` used to remove it when DEBUG was off, i.e. exactly there."""
    middleware = values(SECRET_KEY="x" * 50)["middleware"]
    assert middleware[0] == "django.middleware.security.SecurityMiddleware"
    assert "debug_toolbar.middleware.DebugToolbarMiddleware" not in middleware


def test_production_is_hardened_by_default():
    v = values(SECRET_KEY="x" * 50)
    assert v["debug"] is False
    assert v["ssl_redirect"] is True and v["secure_cookies"] == [True, True]
    assert v["hsts"] > 0 and v["proxy_header"] == ["HTTP_X_FORWARDED_PROTO", "https"]


def test_plain_http_deployments_can_switch_https_only_off():
    v = values(SECRET_KEY="x" * 50, HTTPS_ONLY="false")
    assert v["ssl_redirect"] is False and v["secure_cookies"] == [False, False] and v["hsts"] == 0


def test_hosts_come_from_the_environment_and_are_not_a_wildcard():
    default = values(SECRET_KEY="x" * 50)["hosts"]
    assert default == ["localhost", "127.0.0.1"]  # no wildcard, no deployment address in the code
    custom = values(SECRET_KEY="x" * 50, ALLOWED_HOSTS="api.example.com, www.example.com")
    assert custom["hosts"] == ["api.example.com", "www.example.com"]


def test_cors_only_allows_the_listed_origins():
    v = values(SECRET_KEY="x" * 50, CORS_ALLOWED_ORIGINS="https://app.example.com")
    assert v["cors"] == ["https://app.example.com"] and v["cors_all"] is False


def test_database_defaults_to_the_sqlite_file_and_follows_database_url():
    default = values(SECRET_KEY="x" * 50)
    assert default["engine"].endswith("sqlite3") and default["db_name"].endswith(
        "databases/db.sqlite3"
    )
    pg = values(SECRET_KEY="x" * 50, DATABASE_URL="postgres://u:p@db.internal:5432/clarity")
    assert pg["engine"].endswith("postgresql") and pg["db_name"] == "clarity"


def test_api_docs_follow_debug_unless_overridden():
    assert values(SECRET_KEY="x" * 50)["docs"] is False
    assert values(DEBUG="true", TESTING="true")["docs"] is True
    assert values(SECRET_KEY="x" * 50, API_DOCS_ENABLED="true")["docs"] is True


def test_everything_is_staff_only_unless_a_view_says_otherwise():
    assert values(SECRET_KEY="x" * 50)["permission"] == ["rest_framework.permissions.IsAdminUser"]


def test_debug_mode_needs_no_secret_key():
    result = run(DEBUG="true", TESTING="true")
    assert result.returncode == 0, result.stderr


def test_empty_values_count_as_unset():
    """``MEDIA_ROOT=`` in an .env file used to mean ``.`` (the project folder) and
    ``API_DOCS_ENABLED=`` switched the docs off even in debug mode."""
    v = values(
        DEBUG="true",
        TESTING="true",
        MEDIA_ROOT="",
        STATIC_ROOT="",
        API_DOCS_ENABLED="",
        OPENAI_TIMEOUT="",
        HTTPS_ONLY="",
        ALLOWED_HOSTS="",
    )
    assert v["media_root"].endswith("/clarity_backend/media")
    assert v["static_root"].endswith("/clarity_backend/staticfiles")
    assert v["docs"] is True and v["openai_timeout"] == 30.0
    assert v["hosts"] == ["localhost", "127.0.0.1"]
