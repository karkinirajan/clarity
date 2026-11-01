import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from pages.models import Company


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def company(db):
    return Company.objects.create(
        company_name="Acme Robotics", short_description="Robots", description="<p>Hello</p>"
    )


@pytest.fixture
def staff(db):
    return get_user_model().objects.create_user("staff", "staff@example.com", "pw", is_staff=True)


@pytest.fixture
def member(db):
    return get_user_model().objects.create_user("member", "member@example.com", "pw")
