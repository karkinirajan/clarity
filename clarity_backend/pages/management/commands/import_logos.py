"""Download company logos listed in a CSV file.

    python manage.py import_logos result.csv

Expected columns (a header row is skipped): ``<anything>, <logo url>, <company name>``. This was
``pages.utils.upload_images_from_csv``, which read a hard-coded ``result.csv``, had no timeout
and kept every old logo on disk when it saved a new one.
"""

import csv

import requests
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify

from pages.models import Company

EXTENSIONS = {"image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp"}


class Command(BaseCommand):
    help = "Download company logos listed in a CSV file"

    def add_arguments(self, parser):
        parser.add_argument("csv_path")
        parser.add_argument("--timeout", type=float, default=15.0, help="seconds per download")
        parser.add_argument(
            "--max-bytes", type=int, default=5_000_000, help="largest logo accepted"
        )

    def handle(self, *args, csv_path, timeout, max_bytes, **options):
        try:
            handle = open(csv_path, newline="", encoding="utf-8")
        except OSError as error:
            raise CommandError(f"Cannot read {csv_path}: {error}") from error
        saved = skipped = 0
        with handle:
            reader = csv.reader(handle)
            next(reader, None)  # header
            for row in reader:
                if len(row) < 3 or not row[1].strip():
                    continue
                link, company_name = row[1].strip(), row[2].strip()
                if self.import_one(link, company_name, timeout, max_bytes):
                    saved += 1
                else:
                    skipped += 1
        self.stdout.write(self.style.SUCCESS(f"{saved} logo(s) saved, {skipped} skipped"))

    def import_one(self, link, company_name, timeout, max_bytes):
        if not link.startswith(("http://", "https://")):
            self.stderr.write(f"Skipped {link}: not an http(s) address")
            return False
        company = Company.objects.filter(company_name=company_name).first()
        if company is None:
            self.stderr.write(f"Skipped {company_name!r}: no such company")
            return False
        try:
            response = requests.get(link, timeout=timeout)
        except requests.RequestException as error:
            self.stderr.write(f"Skipped {link}: {error}")
            return False
        kind = response.headers.get("Content-Type", "").split(";")[0].strip().lower()
        if response.status_code != 200 or kind not in EXTENSIONS:
            self.stderr.write(f"Skipped {link}: status {response.status_code}, type {kind or '?'}")
            return False
        if len(response.content) > max_bytes:
            self.stderr.write(f"Skipped {link}: larger than {max_bytes} bytes")
            return False
        company.logo.delete(save=False)  # the old file is replaced, not left behind
        company.logo.save(
            f"{slugify(company_name)}.{EXTENSIONS[kind]}", ContentFile(response.content), save=True
        )
        return True
