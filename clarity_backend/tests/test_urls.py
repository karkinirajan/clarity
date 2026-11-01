from django.db import OperationalError
from django.urls import reverse

from pages.utils import custom_exception_handler


def test_health_is_ok(client, db):
    response = client.get("/health/")
    assert response.status_code == 200 and response.json() == {"status": "ok"}


def test_health_reports_a_database_failure(client, monkeypatch):
    def broken():
        raise OperationalError("database is down")

    monkeypatch.setattr("clarity.views.connection.ensure_connection", broken)
    response = client.get("/health/")
    assert response.status_code == 503 and response.json() == {"status": "unavailable"}


def test_an_unknown_url_is_a_404(client):
    """A catch-all used to answer every unknown path with the Swagger page (and a 500 in
    production, where the ``schema`` URL name does not exist)."""
    assert client.get("/no/such/page").status_code == 404
    assert client.get("/api/nothing/").status_code == 404


def test_the_api_documentation_is_served_when_enabled(client):
    assert client.get("/swagger/schema/").status_code == 200
    assert client.get("/swagger/docs/").status_code == 200
    assert client.get("/").status_code == 302


def test_the_admin_login_page_renders(client):
    assert client.get("/admin/login/").status_code == 200


# ---------------------------------------------------------------------------- error handler
def test_the_status_code_is_added_to_dict_errors(client, db):
    response = client.get(reverse("pages:company-detail", args=[999]))
    assert response.status_code == 404 and response.json()["status_code"] == 404


def test_a_list_shaped_error_no_longer_crashes_the_handler():
    from rest_framework.exceptions import ValidationError

    response = custom_exception_handler(ValidationError(["one", "two"]), context={})
    assert response.status_code == 400 and isinstance(response.data, list)


def test_other_exceptions_are_left_to_django():
    assert custom_exception_handler(RuntimeError("boom"), context={}) is None
