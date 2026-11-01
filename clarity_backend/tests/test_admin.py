"""The admin is the editing tool of the whole project: every page must render."""

import pytest
from django.contrib.admin.sites import site
from django.contrib.auth import get_user_model
from django.test import Client
from django.urls import reverse

pytestmark = pytest.mark.django_db


@pytest.fixture
def admin_client(company):
    user = get_user_model().objects.create_superuser("root", "root@example.com", "pw")
    client = Client()
    client.force_login(user)
    return client


def pages_models():
    return [m for m in site._registry if m._meta.app_label == "pages"]


def test_there_are_admin_pages_for_the_directory_models():
    assert len(pages_models()) >= 8


@pytest.mark.parametrize("which", ["changelist", "add"])
def test_every_pages_admin_page_renders(admin_client, which):
    for model in pages_models():
        url = reverse(f"admin:pages_{model._meta.model_name}_{which}")
        assert admin_client.get(url).status_code == 200, url


def test_searching_companies_works(admin_client):
    """``search_fields`` listed ``company``, which is not a field, so any search was a 500."""
    url = reverse("admin:pages_company_changelist")
    response = admin_client.get(url, {"q": "Acme"})
    assert response.status_code == 200 and b"Acme Robotics" in response.content
    assert b"Acme Robotics" not in admin_client.get(url, {"q": "zzz"}).content


def test_the_import_page_and_resources_load(admin_client):
    from pages import resources

    assert resources.CompanyResource and resources.FounderSocialToSocialResource
    assert admin_client.get(reverse("admin:pages_company_import")).status_code == 200
