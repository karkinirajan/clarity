"""Settings for the test suite: in-memory SQLite, temporary media, nothing sent to OpenAI."""

import os
import tempfile

os.environ["SECRET_KEY"] = "test-only-secret-key-not-used-anywhere-else"
os.environ["DEBUG"] = "true"
os.environ["TESTING"] = "true"
os.environ["DATABASE_URL"] = "sqlite://:memory:"
os.environ["OPENAI_API_KEY"] = ""
os.environ["OPENAI_MODEL"] = ""

from clarity.settings import *  # noqa: E402,F401,F403

MEDIA_ROOT = tempfile.mkdtemp(prefix="clarity-media-")
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}
