from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from pages.models import (
    Company,
    AdminNotes,
    Social,
    Founder,
    Tag,
    SubTag,
    FounderSocialToSocial,
    OpenaiDescription,
)
from pages.serializers import (
    AdminNotesSerializer,
    SocialSerializer,
    FounderSocialSerializer,
    FounderSerializer,
    TagSerializer,
    SubTagSerializer,
    CompanySerializer,
    OpenaiDescriptionSerializer,
)


class CompanyListViewTest(APITestCase):
    def setUp(self):
        self.company1 = Company.objects.create(company_name="Company1")
        self.company2 = Company.objects.create(company_name="Company2")

    def test_get_all_companies(self):
        url = reverse("pages:company-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["company_name"], self.company1.company_name)
        self.assertEqual(response.data[1]["company_name"], self.company2.company_name)

    def test_get_single_company(self):
        url = reverse("pages:company-detail", args=[self.company1.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["company_name"], self.company1.company_name)

    def test_get_nonexistent_company(self):
        url = reverse("pages:company-detail", args=[1000])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CompanyDetailViewTest(APITestCase):
    def setUp(self):
        self.company1 = Company.objects.create(company_name="Company 1")
        self.company2 = Company.objects.create(company_name="Company 2")

    def test_get_valid_company(self):
        url = reverse("pages:company-detail", kwargs={"pk": self.company1.pk})
        response = self.client.get(url)
        company = Company.objects.get(pk=self.company1.pk)
        serializer = CompanySerializer(company)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_invalid_company(self):
        url = reverse("pages:company-detail", kwargs={"pk": 1000})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
