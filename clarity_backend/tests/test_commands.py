import io

import pytest
from django.core.management import call_command
from django.core.management.base import CommandError
from PIL import Image

from pages.models import Company, Founder, Region, SubTag, Tag

pytestmark = pytest.mark.django_db


def png_bytes(color=(10, 120, 30)):
    buffer = io.BytesIO()
    Image.new("RGB", (8, 8), color).save(buffer, "PNG")
    return buffer.getvalue()


# ------------------------------------------------------------------------------ populate_db
def test_populate_db_creates_complete_fake_companies(settings, tmp_path):
    settings.MEDIA_ROOT = tmp_path
    call_command("populate_db", 3, seed=1, stdout=io.StringIO())
    assert Company.objects.count() == 3
    for company in Company.objects.all():
        assert company.logo and (tmp_path / company.logo.name).exists()
        assert 1990 <= int(company.founded) <= 2024
    assert (Tag.objects.count(), SubTag.objects.count()) == (3, 3)
    assert (Region.objects.count(), Founder.objects.count()) == (3, 3)


def test_populate_db_is_repeatable_with_a_seed(settings, tmp_path):
    settings.MEDIA_ROOT = tmp_path
    call_command("populate_db", 2, seed=7, stdout=io.StringIO())
    first = sorted(Company.objects.values_list("company_name", flat=True))
    Company.objects.all().delete()
    call_command("populate_db", 2, seed=7, stdout=io.StringIO())
    assert sorted(Company.objects.values_list("company_name", flat=True)) == first


def test_populate_db_rejects_a_zero_total():
    with pytest.raises(CommandError):
        call_command("populate_db", 0)


# ------------------------------------------------------------------------------ import_logos
class FakeResponse:
    def __init__(self, content=b"", status=200, kind="image/png"):
        self.content, self.status_code = content, status
        self.headers = {"Content-Type": kind}


@pytest.fixture
def downloads(monkeypatch):
    seen = []
    answers = {}

    def fake_get(url, timeout=None, **kwargs):
        seen.append((url, timeout))
        answer = answers[url]
        if isinstance(answer, Exception):
            raise answer
        return answer

    monkeypatch.setattr("pages.management.commands.import_logos.requests.get", fake_get)
    return seen, answers


def csv_file(tmp_path, rows):
    path = tmp_path / "logos.csv"
    path.write_text("id,logo,name\n" + "\n".join(",".join(r) for r in rows) + "\n")
    return str(path)


def run(path, **options):
    out, err = io.StringIO(), io.StringIO()
    call_command("import_logos", path, stdout=out, stderr=err, **options)
    return out.getvalue(), err.getvalue()


def test_a_logo_is_downloaded_and_saved(settings, tmp_path, downloads):
    settings.MEDIA_ROOT = tmp_path
    seen, answers = downloads
    Company.objects.create(company_name="Acme")
    answers["https://cdn.example/acme.png"] = FakeResponse(png_bytes())
    out, _ = run(csv_file(tmp_path, [("1", "https://cdn.example/acme.png", "Acme")]))
    assert "1 logo(s) saved, 0 skipped" in out
    company = Company.objects.get(company_name="Acme")
    assert company.logo.name.endswith("acme.png") and (tmp_path / company.logo.name).exists()
    assert seen == [("https://cdn.example/acme.png", 15.0)]  # a timeout is always passed


def test_replacing_a_logo_removes_the_old_file(settings, tmp_path, downloads):
    settings.MEDIA_ROOT = tmp_path
    _, answers = downloads
    Company.objects.create(company_name="Acme")
    for color in ((1, 2, 3), (9, 9, 9)):
        answers["https://cdn.example/acme.png"] = FakeResponse(png_bytes(color))
        run(csv_file(tmp_path, [("1", "https://cdn.example/acme.png", "Acme")]))
    logos = list((tmp_path / "company_logos").iterdir())
    assert len(logos) == 1  # it used to leave one copy behind per run


@pytest.mark.parametrize(
    "answer",
    [
        FakeResponse(status=404),
        FakeResponse(b"<html></html>", kind="text/html"),
        FakeResponse(b"x" * 20, kind="image/png"),  # over the (lowered) size limit below
    ],
    ids=["not-found", "not-an-image", "too-large"],
)
def test_bad_downloads_are_skipped(settings, tmp_path, downloads, answer):
    settings.MEDIA_ROOT = tmp_path
    _, answers = downloads
    Company.objects.create(company_name="Acme")
    answers["https://cdn.example/a"] = answer
    out, err = run(csv_file(tmp_path, [("1", "https://cdn.example/a", "Acme")]), max_bytes=10)
    assert "0 logo(s) saved, 1 skipped" in out and "Skipped" in err
    assert not Company.objects.get(company_name="Acme").logo


def test_network_errors_unknown_companies_and_other_schemes_are_skipped(
    settings, tmp_path, downloads
):
    import requests

    settings.MEDIA_ROOT = tmp_path
    _, answers = downloads
    Company.objects.create(company_name="Acme")
    answers["https://down.example/x"] = requests.ConnectionError("down")
    rows = [
        ("1", "https://down.example/x", "Acme"),
        ("2", "https://cdn.example/y", "Nobody"),
        ("3", "file:///etc/passwd", "Acme"),
        ("4", "", "Acme"),
    ]
    out, _ = run(csv_file(tmp_path, rows))
    assert "0 logo(s) saved, 3 skipped" in out  # the empty link is ignored silently


def test_a_missing_csv_is_a_clear_error(tmp_path):
    with pytest.raises(CommandError):
        call_command("import_logos", str(tmp_path / "missing.csv"))
