from django.test import TestCase
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


class CompanySerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )

    def test_company_serializer(self):
        serializer = CompanySerializer(instance=self.company)
        expected_fields = set(
            [
                "id",
                "company_name",
                "logo",
                "link",
                "short_description",
                "founded",
                "team_size",
                "location",
                "country",
                "description",
            ]
        )
        self.assertEqual(set(serializer.data.keys()), expected_fields)


class AdminNotesSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )
        self.admin_notes = AdminNotes.objects.create(
            note="Test note",
            company=self.company,
        )

    def test_admin_notes_serializer(self):
        serializer = AdminNotesSerializer(instance=self.admin_notes)
        expected_fields = set(["id", "note", "company"])
        self.assertEqual(set(serializer.data.keys()), expected_fields)


class SocialSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )
        self.social = Social.objects.create(
            social_media="Test social media",
            link="https://www.testlink.com",
            company=self.company,
        )

    def test_social_serializer(self):
        serializer = SocialSerializer(instance=self.social)
        expected_fields = set(["id", "social_media", "link", "company"])
        data_keys = set(serializer.data.keys())
        extra_fields = data_keys - expected_fields
        missing_fields = expected_fields - data_keys
        self.assertFalse(extra_fields, f"Serializer has extra fields: {extra_fields}")
        self.assertFalse(
            missing_fields, f"Serializer is missing fields: {missing_fields}"
        )
        self.assertEqual(data_keys, expected_fields)


class FounderSocialSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )
        self.founder = Founder.objects.create(
            name="Test founder", role="Test role", company=self.company
        )
        self.founder_social = FounderSocialToSocial.objects.create(
            founder=self.founder,
            social_media="Test social media",
            link="https://www.testlink.com",
        )

    def test_founder_social_serializer(self):
        serializer = FounderSocialSerializer(instance=self.founder_social)
        expected_fields = set(["id", "social_media", "link"])
        self.assertEqual(set(serializer.data.keys()), expected_fields)


class FounderSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )
        self.founder = Founder.objects.create(
            name="Test founder", role="Test role", company=self.company
        )
        self.founder_social = FounderSocialToSocial.objects.create(
            founder=self.founder,
            social_media="Test social media",
            link="https://www.testlink.com",
        )

    def test_founder_serializer(self):
        serializer = FounderSerializer(instance=self.founder)
        expected_fields = set(
            ["id", "name", "role", "company", "foundersocialtosocial_set"]
        )
        self.assertEqual(set(serializer.data.keys()), expected_fields)


class TagSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )
        self.tag = Tag.objects.create(
            name="Test tag",
            company=self.company,
        )

    def test_tag_serializer(self):
        serializer = TagSerializer(instance=self.tag)
        expected_fields = set(["id", "name", "company"])
        expected_data = {
            "id": self.tag.id,
            "name": "Test tag",
            "company": self.company.id,
        }
        data = serializer.data
        self.assertEqual(set(data.keys()), expected_fields)
        self.assertDictEqual(data, expected_data)


class SubTagSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="Test description",
            founded=2020,
            team_size=10,
            location="Test location",
            country="Test country",
            description="Test long description",
        )
        self.tag = Tag.objects.create(
            name="Test tag",
            company=self.company,
        )
        self.sub_tag = SubTag.objects.create(
            sub_tag="Test sub tag",
            tag=self.tag,
            company=self.company,
        )

    def test_sub_tag_serializer(self):
        serializer = SubTagSerializer(instance=self.sub_tag)
        expected_fields = set(["id", "sub_tag", "tag", "company"])
        expected_data = {
            "id": self.sub_tag.id,
            "sub_tag": "Test sub tag",
            "tag": self.tag.id,
            "company": self.company.id,
        }
        data = serializer.data
        self.assertEqual(set(data.keys()), expected_fields)
        self.assertDictEqual(data, expected_data)


class OpenaiDescriptionSerializerTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Example Company",
            short_description="An example company",
            description="A description of the example company",
        )
        self.openai_description = OpenaiDescription.objects.create(
            company=self.company,
            prompt="Example prompt",
            generated_text="Example generated text",
        )
        self.serializer = OpenaiDescriptionSerializer(instance=self.openai_description)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(
            set(data.keys()), set(["id", "company", "prompt", "generated_text"])
        )

    def test_company_field_content(self):
        data = self.serializer.data
        self.assertEqual(data["company"], self.company.id)

    def test_prompt_field_content(self):
        data = self.serializer.data
        self.assertEqual(data["prompt"], self.openai_description.prompt)

    def test_generated_text_field_content(self):
        data = self.serializer.data
        self.assertEqual(data["generated_text"], self.openai_description.generated_text)
