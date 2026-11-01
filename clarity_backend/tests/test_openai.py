"""``OpenaiDescription.save`` drafts text with OpenAI only for a new or changed prompt, never fails
the save, and strips the editor's HTML from the prompt. OpenAI itself is always a fake here."""

import pytest
from openai import OpenAIError

from pages.models import OpenaiDescription

pytestmark = pytest.mark.django_db


class FakeOpenAI:
    instances = []
    answer = "  A concise description.  "
    error = None

    def __init__(self, **kwargs):
        self.kwargs = kwargs
        self.calls = []
        FakeOpenAI.instances.append(self)
        completions = type("Completions", (), {"create": self.create})()
        self.chat = type("Chat", (), {"completions": completions})()

    def create(self, **kwargs):
        self.calls.append(kwargs)
        if FakeOpenAI.error:
            raise FakeOpenAI.error
        message = type("Message", (), {"content": FakeOpenAI.answer})()
        return type("Response", (), {"choices": [type("Choice", (), {"message": message})()]})()


@pytest.fixture
def configured(settings, monkeypatch):
    FakeOpenAI.instances, FakeOpenAI.answer, FakeOpenAI.error = (
        [],
        "  A concise description.  ",
        None,
    )
    settings.OPENAI_API_KEY = "sk-test-demo"
    settings.OPENAI_MODEL = "demo-model"
    monkeypatch.setattr("pages.services.OpenAI", FakeOpenAI)
    return FakeOpenAI


def calls():
    return [call for instance in FakeOpenAI.instances for call in instance.calls]


def test_without_a_key_the_description_is_saved_and_nothing_is_sent(company, monkeypatch):
    monkeypatch.setattr("pages.services.OpenAI", FakeOpenAI)
    FakeOpenAI.instances = []
    description = OpenaiDescription.objects.create(company=company, prompt="Write about Acme")
    assert description.pk and description.generated_text is None
    assert FakeOpenAI.instances == []


def test_a_new_prompt_is_answered(company, configured):
    description = OpenaiDescription.objects.create(company=company, prompt="Write about Acme")
    assert description.generated_text == "A concise description."
    assert calls()[0]["model"] == "demo-model"
    assert configured.instances[0].kwargs["api_key"] == "sk-test-demo"
    assert configured.instances[0].kwargs["timeout"] > 0


def test_the_editors_html_is_removed_from_the_prompt(company, configured):
    OpenaiDescription.objects.create(company=company, prompt="<p>Write <b>about</b> Acme</p>")
    assert calls()[0]["messages"] == [{"role": "user", "content": "Write about Acme"}]


def test_saving_again_without_changing_the_prompt_costs_nothing(company, configured):
    description = OpenaiDescription.objects.create(company=company, prompt="Write about Acme")
    description = OpenaiDescription.objects.get(pk=description.pk)
    description.save()
    description.save()
    assert len(calls()) == 1


def test_a_changed_prompt_is_asked_again(company, configured):
    description = OpenaiDescription.objects.create(company=company, prompt="First")
    description = OpenaiDescription.objects.get(pk=description.pk)
    description.prompt = "Second"
    configured.answer = "Second answer"
    description.save()
    assert len(calls()) == 2
    description.refresh_from_db()
    assert description.generated_text == "Second answer"


def test_an_empty_prompt_asks_nothing(company, configured):
    OpenaiDescription.objects.create(company=company, prompt="")
    assert calls() == []


def test_an_openai_failure_does_not_lose_the_record(company, configured, caplog):
    configured.error = OpenAIError("service down")
    description = OpenaiDescription.objects.create(company=company, prompt="Write about Acme")
    assert description.pk and description.generated_text is None
    assert "service down" in caplog.text


def test_an_existing_text_is_kept_when_a_retry_fails(company, configured):
    description = OpenaiDescription.objects.create(company=company, prompt="One")
    configured.error = OpenAIError("down")
    description = OpenaiDescription.objects.get(pk=description.pk)
    description.prompt = "Two"
    description.save()
    description.refresh_from_db()
    assert description.generated_text == "A concise description."
