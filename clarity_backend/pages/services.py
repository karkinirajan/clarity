"""Talking to OpenAI. Kept out of the model so saving a record never depends on the network."""

from django.conf import settings
from openai import OpenAI, OpenAIError


class GenerationUnavailable(Exception):
    """No text could be generated (not configured, or OpenAI did not answer)."""


def generate_text(prompt):
    """Return the model's answer to ``prompt``; raise ``GenerationUnavailable`` if it cannot.

    ``OPENAI_API_KEY`` and ``OPENAI_MODEL`` must both be set. The old code used the legacy
    completions endpoint with the ``text-davinci-003`` engine, which no longer exists.
    """
    if not (settings.OPENAI_API_KEY and settings.OPENAI_MODEL):
        raise GenerationUnavailable("OPENAI_API_KEY and OPENAI_MODEL are not both set")
    client = OpenAI(api_key=settings.OPENAI_API_KEY, timeout=settings.OPENAI_TIMEOUT)
    try:
        response = client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=[{"role": "user", "content": prompt}],
        )
    except OpenAIError as error:
        raise GenerationUnavailable(str(error)) from error
    return (response.choices[0].message.content or "").strip()
