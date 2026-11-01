"""Django settings. Everything environment-specific comes from environment variables (see
.env.example; ``manage.py`` also loads a local ``.env``). Nothing secret is stored in the repository."""

import os
from pathlib import Path

import dj_database_url
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent


def env(name, default=""):
    """An environment variable; an empty one counts as unset (``.env`` files often list optional
    variables with nothing after the ``=``)."""
    return os.environ.get(name) or default


def env_bool(name, default=False):
    return str(env(name, default)).strip().lower() in {"1", "true", "yes", "on"}


def env_list(name, default=""):
    return [v.strip() for v in env(name, default).split(",") if v.strip()]


DEBUG = env_bool("DEBUG", False)

SECRET_KEY = env("SECRET_KEY")
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured("Set SECRET_KEY (or DEBUG=true for local work).")
    SECRET_KEY = "django-insecure-local-development-only"

ALLOWED_HOSTS = env_list("ALLOWED_HOSTS", "localhost,127.0.0.1")
CSRF_TRUSTED_ORIGINS = env_list("CSRF_TRUSTED_ORIGINS")

INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "drf_spectacular",
    "ckeditor",
    "import_export",
    "pages",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "clarity.urls"
WSGI_APPLICATION = "clarity.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# SQLite file by default (the path the project always used); DATABASE_URL selects PostgreSQL etc.
# (An empty DATABASE_URL counts as unset: dj_database_url.config() would return {} for it.)
DATABASES = {
    "default": dj_database_url.parse(
        os.environ.get("DATABASE_URL") or f"sqlite:///{BASE_DIR / 'databases' / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = Path(env("STATIC_ROOT", BASE_DIR / "staticfiles"))
MEDIA_URL = "/media/"
MEDIA_ROOT = Path(env("MEDIA_ROOT", BASE_DIR / "media"))
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedStaticFilesStorage"},
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
# Django 6 assumes https:// for a URL typed without a scheme in forms; opt in now.
FORMS_URLFIELD_ASSUME_HTTPS = True
EMAIL_BACKEND = env("EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend")

# The public data is read-only; everything not marked AllowAny in the views needs a staff login.
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework.authentication.SessionAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAdminUser"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "EXCEPTION_HANDLER": "pages.utils.custom_exception_handler",
    "DATETIME_FORMAT": "%m/%d/%Y %H:%M:%S",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Clarity API",
    "DESCRIPTION": "Clarity API Documentation",
    "VERSION": "1.0.1",
}

# OpenAPI schema and Swagger / Redoc pages (on by default only in development).
API_DOCS_ENABLED = env_bool("API_DOCS_ENABLED", DEBUG)

# Origins of the front-end that call the API from the browser. (The old settings also had
# CORS_ORIGIN_ALLOW_ALL = True, which made the list below pointless.)
CORS_ALLOWED_ORIGINS = env_list("CORS_ALLOWED_ORIGINS", "http://localhost:3000")

# Drafting company descriptions with OpenAI. Without both values nothing is sent and the
# description is simply saved without generated text.
OPENAI_API_KEY = env("OPENAI_API_KEY")
OPENAI_MODEL = env("OPENAI_MODEL")
OPENAI_TIMEOUT = float(env("OPENAI_TIMEOUT", "30"))

JAZZMIN_SETTINGS = {
    "site_title": "Clarity Admin",
    "site_header": "Clarity",
    "site_brand": "Clarity",
    "site_icon": None,
    "welcome_sign": "Welcome to the Clarity",
    "copyright": "Clarity Pvt Ltd",
    "search_model": ["auth.User", "auth.Group"],
    "show_sidebar": True,
    "navigation_expanded": True,
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    "use_google_fonts_cdn": True,
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": env("LOG_LEVEL", "INFO")},
}

# ----- production hardening ---------------------------------------------------------------------
# The old settings ran ``del MIDDLEWARE[0]`` when DEBUG was off, which removed SecurityMiddleware
# (the HTTPS redirect, HSTS, nosniff) in exactly the environment that needs it.
if not DEBUG:
    # HTTPS_ONLY=false is for a deployment that is reached over plain HTTP (for example the bundled
    # nginx on port 80 with TLS terminated elsewhere or not at all): secure cookies would never be
    # sent back, which locks everyone out of the admin.
    HTTPS_ONLY = env_bool("HTTPS_ONLY", True)
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = HTTPS_ONLY
    SESSION_COOKIE_SECURE = HTTPS_ONLY
    CSRF_COOKIE_SECURE = HTTPS_ONLY
    SECURE_HSTS_SECONDS = int(env("HSTS_SECONDS", "3600")) if HTTPS_ONLY else 0

if DEBUG and not env_bool("TESTING", False):
    try:  # development tools live in the optional dev dependency group
        import debug_toolbar  # noqa: F401
    except ImportError:
        pass
    else:
        INSTALLED_APPS += ["debug_toolbar"]
        MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
        INTERNAL_IPS = ["127.0.0.1"]
