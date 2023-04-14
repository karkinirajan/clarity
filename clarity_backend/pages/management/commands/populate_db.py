from django.core.management.base import BaseCommand
from faker import Faker
from PIL import Image
from io import BytesIO
from django.core.files import File
from pages.models import Company

# Generate an image file
image = Image.new("RGB", (100, 100), color=(73, 109, 137))
image_file = BytesIO()
image.save(image_file, "jpeg")
image_file.seek(0)
fake = (Faker(),)

# Save the image file to the Company model
company = Company(
    company_name=fake.name(),
    location=fake.city(),
    founded=fake.date_between(start_date="-30y", end_date="today"),
    short_description=fake.text(),
    logo=File(image_file, "company_logo.jpeg"),
    link=fake.url(),
    team_size=fake.random_int(min=1, max=1000),
    country=fake.country(),
    description=fake.paragraph(),
)
company.save()


class Command(BaseCommand):
    help = "Populate the database with fake companies"

    def add_arguments(self, parser):
        parser.add_argument(
            "total", type=int, help="Indicates the number of companies to be created"
        )

    def handle(self, *args, **kwargs):
        total = kwargs["total"]
        fake = Faker()
        for i in range(total):
            company = Company(
                company_name=fake.company(),
                location=fake.city(),
                founded=fake.date_between(start_date="-30y", end_date="today"),
                short_description=fake.text(),
                logo=fake.image_url(),
                link=fake.url(),
                team_size=fake.random_int(min=1, max=1000),
                country=fake.country(),
                description=fake.paragraph(),
            )
            company.save()
            self.stdout.write(self.style.SUCCESS(f"Successfully created company {i}"))
