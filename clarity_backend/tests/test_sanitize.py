"""Descriptions are admin-written rich text shown with ``v-html``: they are cleaned on output."""

import pytest
from django.urls import reverse

from pages.models import Company
from pages.sanitize import clean_html

EVIL = (
    '<p onclick="steal()">Hi <strong>there</strong></p><script>alert(1)</script>'
    '<img src=x onerror="alert(2)"><a href="javascript:alert(3)">click</a>'
    '<a href="https://example.com/page">fine</a><style>body{display:none}</style>'
)


def test_script_handlers_styles_and_javascript_links_are_removed():
    html = clean_html(EVIL)
    for bad in (
        "<script",
        "alert(1)",
        "onclick",
        "onerror",
        "javascript:",
        "<style",
        "display:none",
    ):
        assert bad not in html


def test_ordinary_formatting_survives():
    html = clean_html(EVIL)
    assert "<strong>there</strong>" in html
    assert 'href="https://example.com/page"' in html
    assert 'rel="noopener noreferrer"' in html


@pytest.mark.parametrize("value", [None, ""])
def test_empty_values_pass_through(value):
    assert clean_html(value) == value


@pytest.mark.django_db
def test_the_api_serves_the_cleaned_description(client):
    company = Company.objects.create(company_name="Evil Corp", description=EVIL)
    body = client.get(reverse("pages:company-detail", args=[company.pk])).json()
    assert "<script" not in body["description"] and "onerror" not in body["description"]
    assert "<strong>there</strong>" in body["description"]
    company.refresh_from_db()
    assert "<script>" in company.description  # stored as the editor wrote it; cleaned on output


@pytest.mark.django_db
def test_a_company_without_a_description_is_listed(client):
    Company.objects.create(company_name="Bare")
    body = client.get(reverse("pages:company-list")).json()
    assert body[0]["description"] is None
