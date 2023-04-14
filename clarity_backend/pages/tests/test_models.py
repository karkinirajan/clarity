from django.test import TestCase
from pages.models import (
    Company,
    Founder,
    Region,
    Tag,
    SubTag,
    FounderSocialToSocial,
    Social,
    OpenaiDescription,
    AdminNotes,
)


class CompanyModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.company = Company.objects.create(
            company_name="My Company",
            logo="company_logos/logo.png",
            link="https://www.mycompany.com",
            short_description="We make great products.",
            founded=2000,
            team_size=50,
            location="New York",
            country="USA",
            description="My Company makes amazing things!",
        )

    def test_company_str_method(self):
        """
        Test the __str__ method of the Company model.
        """
        expected_result = "My Company"
        actual_result = str(self.company)
        self.assertEqual(actual_result, expected_result)

    def test_company_fields(self):
        """
        Test that all fields of the Company model are properly defined.
        """
        company = Company.objects.first()

        self.assertEqual(company.company_name, "My Company")
        self.assertEqual(company.logo.name, "company_logos/logo.png")
        self.assertEqual(company.link, "https://www.mycompany.com")
        self.assertEqual(company.short_description, "We make great products.")
        self.assertEqual(company.founded, 2000)
        self.assertEqual(company.team_size, 50)
        self.assertEqual(company.location, "New York")
        self.assertEqual(company.country, "USA")
        self.assertEqual(company.description, "My Company makes amazing things!")

    def test_company_fields_null_and_blank_values(self):
        """
        Test that fields of the Company model can accept null and blank values.
        """
        Company.objects.create(
            company_name="Another Company",
            logo="company_logos/another.png",
            link="https://www.anothercompany.com",
            short_description=None,
            founded=None,
            team_size=None,
            location="Paris",
            country="France",
            description=None,
        )

        company = Company.objects.get(company_name="Another Company")

        self.assertIsNone(company.short_description)
        self.assertIsNone(company.founded)
        self.assertIsNone(company.team_size)
        self.assertIsNone(company.description)

    def test_company_ordering(self):
        """
        Test the ordering of the Company model.
        """
        Company.objects.create(
            company_name="Acme Corp.",
            logo="company_logos/acme.png",
            link="https://www.acme.com",
            short_description="We make everything.",
            founded=1900,
            team_size=500,
            location="London",
            country="UK",
            description="Acme Corp. is the world's largest manufacturer of anvils and dynamite.",
        )

        companies = Company.objects.all()

        self.assertEqual(companies[0].company_name, "Acme Corp.")
        self.assertEqual(companies[1].company_name, "My Company")

    def test_company_unicode_characters(self):
        """
        Test that the Company model can handle unicode characters in its fields.
        """
        Company.objects.create(
            company_name="Les chocolats français",
            logo="company_logos/chocolat.png",
            link="https://www.chocolat.com",
            short_description="Le chocolat est délicieux.",
            founded=1990,
            team_size=10,
            location="Marseille",
            country="France",
            description="Les chocolats français est une entreprise spécialisée dans la production de chocolat.",
        )

        company = Company.objects.get(company_name="Les chocolats français")

        self.assertEqual(company.company_name, "Les chocolats français")
        self.assertEqual(company.short_description, "Le chocolat est délicieux.")
        self.assertEqual(
            company.description,
            "Les chocolats français est une entreprise spécialisée dans la production de chocolat.",
        )
        self.assertEqual(company.location, "Marseille")
        self.assertEqual(company.country, "France")


class AdminNotesModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.company = Company.objects.create(
            company_name="Acme Corporation",
            short_description="A fictional company",
            founded=1955,
            team_size=100,
            location="New York",
            country="USA",
        )

    def setUp(self):
        self.note = "This is an administrative note"

    def test_admin_notes_creation(self):
        admin_note = AdminNotes.objects.create(company=self.company, note=self.note)
        self.assertTrue(isinstance(admin_note, AdminNotes))
        self.assertEqual(admin_note.__str__(), self.company.company_name)

    def test_admin_notes_note(self):
        admin_note = AdminNotes.objects.create(company=self.company, note=self.note)
        self.assertEqual(admin_note.note, self.note)

    def test_admin_notes_company(self):
        admin_note = AdminNotes.objects.create(company=self.company, note=self.note)
        self.assertEqual(admin_note.company, self.company)

    def test_admin_notes_note_blank(self):
        admin_note = AdminNotes.objects.create(company=self.company, note="")
        self.assertEqual(admin_note.note, "")


class SocialModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.company = Company.objects.create(company_name="Test Company")

    def setUp(self):
        # Set up modified objects used by test methods
        self.social = Social.objects.create(
            social_media="Twitter",
            link="https://twitter.com/test_company",
            company=self.company,
        )

    def test_social_media_label(self):
        social = Social.objects.get(id=1)
        field_label = social._meta.get_field("social_media").verbose_name
        self.assertEqual(field_label, "social media")

    def test_link_label(self):
        social = Social.objects.get(id=1)
        field_label = social._meta.get_field("link").verbose_name
        self.assertEqual(field_label, "link")

    def test_company_label(self):
        social = Social.objects.get(id=1)
        field_label = social._meta.get_field("company").verbose_name
        self.assertEqual(field_label, "company")

    def test_social_media_max_length(self):
        social = Social.objects.get(id=1)
        max_length = social._meta.get_field("social_media").max_length
        self.assertEqual(max_length, 255)

    def test_link_null_or_blank(self):
        social = Social.objects.get(id=1)
        link_null = social._meta.get_field("link").null
        link_blank = social._meta.get_field("link").blank
        self.assertTrue(link_null)
        self.assertTrue(link_blank)

    def test_company_foreign_key(self):
        social = Social.objects.get(id=1)
        self.assertEqual(social.company.company_name, "Test Company")

    def test_social_string_representation(self):
        social = Social.objects.get(id=1)
        expected_output = f"{social.company.company_name}"
        self.assertEqual(str(social), expected_output)

    def test_verbose_name_plural(self):
        self.assertEqual(str(Social._meta.verbose_name_plural), "Company Socials")


class FounderModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.company = Company.objects.create(
            company_name="Test Company",
            logo="company_logos/test_logo.png",
            link="https://www.example.com/",
            short_description="Test Company short description.",
            founded=2022,
            team_size=10,
            location="Test Location",
            country="Test Country",
            description="Test Company description.",
        )

    def test_name_field(self):
        founder = Founder.objects.create(
            name="Test Founder", role="Test Role", company=self.company
        )
        field_label = founder._meta.get_field("name").verbose_name
        self.assertEqual(field_label, "name")
        max_length = founder._meta.get_field("name").max_length
        self.assertEqual(max_length, 255)
        self.assertEqual(founder.name, "Test Founder")

    def test_role_field(self):
        founder = Founder.objects.create(
            name="Test Founder", role="Test Role", company=self.company
        )
        field_label = founder._meta.get_field("role").verbose_name
        self.assertEqual(field_label, "role")
        max_length = founder._meta.get_field("role").max_length
        self.assertEqual(max_length, 255)
        self.assertEqual(founder.role, "Test Role")

    def test_company_field(self):
        founder = Founder.objects.create(
            name="Test Founder", role="Test Role", company=self.company
        )
        self.assertEqual(founder.company, self.company)

    def test_str_method(self):
        founder = Founder.objects.create(
            name="Test Founder", role="Test Role", company=self.company
        )
        self.assertEqual(str(founder), "Test Founder")

    def test_meta_options(self):
        self.assertEqual(Founder._meta.verbose_name_plural, "Founders")


class RegionModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.company = Company.objects.create(
            company_name="Test Company",
            logo="company_logos/test_logo.png",
            link="https://www.example.com/",
            short_description="Test Company short description.",
            founded=2022,
            team_size=10,
            location="Test Location",
            country="Test Country",
            description="Test Company description.",
        )
        Region.objects.create(
            region="Test Region",
            company=cls.company,
        )

    def test_region_name(self):
        region = Region.objects.get(id=1)
        expected_name = f"{region.region}"
        self.assertEqual(expected_name, str(region))

    def test_company_foreign_key(self):
        region = Region.objects.get(id=1)
        expected_company = Company.objects.get(id=1)
        self.assertEqual(expected_company, region.company)

    def test_region_max_length(self):
        region = Region.objects.get(id=1)
        max_length = region._meta.get_field("region").max_length
        self.assertEqual(max_length, 255)


class TagModelTest(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company",
            short_description="A short description",
            team_size=5,
            location="Test Location",
            country="Test Country",
        )
        self.tag = Tag.objects.create(name="Test Tag", company=self.company)

    def test_string_representation(self):
        self.assertEqual(str(self.tag), "Test Tag")

    def test_verbose_name_plural(self):
        self.assertEqual(str(Tag._meta.verbose_name_plural), "Tags")

    def test_tag_has_company(self):
        self.assertEqual(self.tag.company, self.company)
        self.assertIn(self.tag, self.company.tags.all())

    def test_tag_name_max_length(self):
        max_length = self.tag._meta.get_field("name").max_length
        self.assertEqual(max_length, 255)

    def test_tag_name_blank(self):
        field = self.tag._meta.get_field("name")
        self.assertFalse(field.blank)

    def test_tag_name_null(self):
        field = self.tag._meta.get_field("name")
        self.assertFalse(field.null)


class SubTagModelTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Acme Inc.",
            founded=2020,
            team_size=10,
            location="San Francisco",
            country="USA",
        )
        self.tag = Tag.objects.create(name="Technology", company=self.company)

    def test_create_subtag(self):
        subtag = SubTag.objects.create(
            sub_tag="Artificial Intelligence", company=self.company, tag=self.tag
        )
        self.assertEqual(subtag.sub_tag, "Artificial Intelligence")
        self.assertEqual(subtag.company, self.company)
        self.assertEqual(subtag.tag, self.tag)

    def test_subtag_str(self):
        subtag = SubTag.objects.create(
            sub_tag="Artificial Intelligence", company=self.company, tag=self.tag
        )
        self.assertEqual(str(subtag), "Artificial Intelligence")

    def test_subtag_with_no_tag(self):
        subtag = SubTag.objects.create(sub_tag="Machine Learning", company=self.company)
        self.assertEqual(subtag.sub_tag, "Machine Learning")
        self.assertEqual(subtag.company, self.company)
        self.assertIsNone(subtag.tag)


class FounderSocialToSocialModelTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(company_name="Acme Inc.")
        self.founder = Founder.objects.create(
            name="John Doe", role="CEO", company=self.company
        )

    def test_str_representation(self):
        founder_social = FounderSocialToSocial.objects.create(
            social_media="Twitter",
            founder=self.founder,
            link="https://twitter.com/johndoe",
        )
        self.assertEqual(str(founder_social), "John Doe-Twitter")

    def test_social_media_field_can_be_null(self):
        founder_social = FounderSocialToSocial.objects.create(
            founder=self.founder,
            link="https://twitter.com/johndoe",
        )
        self.assertIsNone(founder_social.social_media)

    def test_link_field_can_be_null(self):
        founder_social = FounderSocialToSocial.objects.create(
            social_media="Twitter",
            founder=self.founder,
        )
        self.assertIsNone(founder_social.link)


class OpenaiDescriptionTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            company_name="Test Company", description="This is a test company"
        )

    def test_generated_text_is_created_after_save(self):
        description = OpenaiDescription(company=self.company, prompt="Test prompt")
        description.save()
        self.assertIsNotNone(description.generated_text)
