"""Fill the database with fake companies for development.

    python manage.py populate_db 25 --seed 1

The old command ran ``Faker()`` calls on a *tuple* at import time (so it could not even load),
stored a remote image URL in an image field and a date in a 4-digit decimal.
"""

from io import BytesIO

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify
from PIL import Image

from pages.models import Company, Founder, Region, SubTag, Tag


def placeholder_logo(color):
    buffer = BytesIO()
    Image.new("RGB", (96, 96), color).save(buffer, "PNG")
    return buffer.getvalue()


class Command(BaseCommand):
    help = (
        "Populate the database with fake companies (development only: needs the dev dependencies)"
    )

    def add_arguments(self, parser):
        parser.add_argument("total", type=int, help="How many companies to create")
        parser.add_argument("--seed", type=int, default=None, help="Repeatable data")

    def handle(self, *args, total, seed, **options):
        try:
            from faker import Faker
        except ImportError as error:
            raise CommandError("Faker is a dev dependency: run `uv sync` first.") from error
        if total < 1:
            raise CommandError("total must be at least 1")
        if seed is not None:
            Faker.seed(seed)
        fake = Faker()

        for number in range(total):
            name = fake.company()
            company = Company.objects.create(
                company_name=name,
                location=fake.city(),
                country=fake.country(),
                founded=fake.random_int(min=1990, max=2024),
                short_description=fake.sentence(),
                description=f"<p>{fake.paragraph()}</p>",
                link=fake.url(),
                team_size=fake.random_int(min=1, max=1000),
            )
            color = tuple(fake.random_int(min=40, max=215) for _ in range(3))
            company.logo.save(f"{slugify(name)}.png", ContentFile(placeholder_logo(color)))
            tag = Tag.objects.create(name=fake.word(), company=company)
            SubTag.objects.create(sub_tag=fake.word(), company=company, tag=tag)
            Region.objects.create(region=fake.country(), company=company)
            Founder.objects.create(name=fake.name(), role="Founder", company=company)
            self.stdout.write(self.style.SUCCESS(f"Created company {number + 1}: {name}"))
