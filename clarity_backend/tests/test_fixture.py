import pytest
from django.core.management import call_command
from django.urls import reverse

pytestmark = pytest.mark.django_db


def test_the_shipped_directory_data_loads_and_is_served(client):
    """pages/fixtures/companies.json is the public data of the old committed database."""
    call_command("loaddata", "companies.json", verbosity=0)
    from pages.models import Company

    assert Company.objects.count() == 158
    assert len(client.get(reverse("pages:company-list")).json()) == 158
