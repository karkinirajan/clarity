"""The directory is public and read-only. The administrative notes and the OpenAI prompts and drafts
are internal: they used to be readable by anyone, because the default permission was AllowAny."""

import pytest
from django.urls import reverse

from pages.models import (
    AdminNotes,
    Founder,
    FounderSocialToSocial,
    OpenaiDescription,
    Region,
    Social,
    SubTag,
    Tag,
)

pytestmark = pytest.mark.django_db


@pytest.fixture
def populated(company):
    tag = Tag.objects.create(name="AI", company=company)
    founder = Founder.objects.create(name="Ada", role="CEO", company=company)
    return {
        "company": company,
        "tag": tag,
        "subtag": SubTag.objects.create(sub_tag="Vision", company=company, tag=tag),
        "region": Region.objects.create(region="Europe", company=company),
        "social": Social.objects.create(social_media="X", link="https://x.com/a", company=company),
        "founder": founder,
        "founder_social": FounderSocialToSocial.objects.create(
            social_media="X", founder=founder, link="https://x.com/ada"
        ),
        "note": AdminNotes.objects.create(company=company, note="<p>call them back</p>"),
        "draft": OpenaiDescription.objects.create(company=company, prompt="Internal prompt"),
    }


PUBLIC = [
    ("company", "company-list", "company-detail"),
    ("tag", "tag-list", "tag-detail"),
    ("subtag", "subtag-list", "subtag-detail"),
    ("region", "region-list", "region-detail"),
    ("social", "social-list", "social-detail"),
    ("founder", "founder-list", "founder-detail"),
    ("founder_social", "founder-social-list", "founder-social-detail"),
]
PRIVATE = [
    ("note", "admin-notes-list", "admin-notes-detail"),
    ("draft", "openai-description-list", "openai-description-detail"),
]


@pytest.mark.parametrize("key, list_name, detail_name", PUBLIC)
def test_the_directory_is_public(client, populated, key, list_name, detail_name):
    assert client.get(reverse(f"pages:{list_name}")).status_code == 200
    detail = client.get(reverse(f"pages:{detail_name}", args=[populated[key].pk]))
    assert detail.status_code == 200
    assert detail.json()["id"] == populated[key].pk


@pytest.mark.parametrize("key, list_name, detail_name", PRIVATE)
def test_internal_data_is_closed_to_anonymous_visitors(
    client, populated, key, list_name, detail_name
):
    assert client.get(reverse(f"pages:{list_name}")).status_code in (401, 403)
    assert client.get(reverse(f"pages:{detail_name}", args=[populated[key].pk])).status_code in (
        401,
        403,
    )


@pytest.mark.parametrize("key, list_name, detail_name", PRIVATE)
def test_internal_data_is_closed_to_ordinary_users(
    client, member, populated, key, list_name, detail_name
):
    client.force_login(member)
    assert client.get(reverse(f"pages:{list_name}")).status_code == 403


@pytest.mark.parametrize("key, list_name, detail_name", PRIVATE)
def test_staff_can_read_internal_data(client, staff, populated, key, list_name, detail_name):
    client.force_login(staff)
    assert client.get(reverse(f"pages:{list_name}")).status_code == 200
    assert client.get(reverse(f"pages:{detail_name}", args=[populated[key].pk])).status_code == 200


def test_the_region_detail_returns_that_region_not_the_list(client, company):
    first = Region.objects.create(region="Asia", company=company)
    Region.objects.create(region="Africa", company=company)
    body = client.get(reverse("pages:region-detail", args=[first.pk])).json()
    assert isinstance(body, dict) and body["region"] == "Asia"  # it used to be the list view


@pytest.mark.parametrize("name", ["company-list", "tag-list", "region-list"])
def test_the_public_api_is_read_only(client, populated, name):
    assert client.post(reverse(f"pages:{name}"), {}, format="json").status_code == 405
