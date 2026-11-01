import logging

from ckeditor.fields import RichTextField
from django.db import models
from django.utils.html import strip_tags

from .services import GenerationUnavailable, generate_text

logger = logging.getLogger(__name__)


class Company(models.Model):
    """
    Model representing a company.
    """

    company_name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="company_logos", blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    short_description = models.TextField(blank=True, null=True)
    founded = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=0)
    team_size = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    description = RichTextField(blank=True, null=True)

    def __str__(self):
        """
        Returns a string representation of the company.
        """
        return self.company_name

    class Meta:
        verbose_name_plural = "Companies"
        ordering = ["company_name"]


class AdminNotes(models.Model):
    """
    Model representing administrative notes for a company.
    """

    company = models.ForeignKey(Company, related_name="admin_notes", on_delete=models.CASCADE)
    note = RichTextField(blank=True)

    def __str__(self):
        """
        Returns a string representation of the administrative notes.
        """
        return self.company.company_name

    class Meta:
        verbose_name_plural = "Admin Notes"


class Social(models.Model):
    """
    Model representing social media links for a company.
    """

    social_media = models.CharField(max_length=255)
    link = models.URLField(null=True, blank=True)
    company = models.ForeignKey(Company, related_name="socials", on_delete=models.CASCADE)

    def __str__(self):
        """
        Returns a string representation of the social media link.
        """
        return f"{self.company.company_name}"

    class Meta:
        verbose_name = "Company Social"
        verbose_name_plural = "Company Socials"


class Founder(models.Model):
    """
    Model representing a founder of a company.
    """

    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name="founders", on_delete=models.CASCADE)

    def __str__(self):
        """
        Returns a string representation of the founder.
        """
        return self.name

    class Meta:
        verbose_name_plural = "Founders"


class Region(models.Model):
    """
    Model representing a region of a company.
    """

    region = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name="regions", on_delete=models.CASCADE)

    def __str__(self):
        """
        Returns a string representation of the region.
        """
        return self.region

    class Meta:
        verbose_name_plural = "Regions"


class Tag(models.Model):
    """
    Model representing a tag for a company.
    """

    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name="tags", on_delete=models.CASCADE)

    def __str__(self):
        """
        Returns a string representation of the tag.
        """
        return self.name

    class Meta:
        verbose_name_plural = "Tags"


class SubTag(models.Model):
    """
    Model representing a sub-tag for a company.
    """

    sub_tag = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name="subtags", on_delete=models.CASCADE)
    tag = models.ForeignKey(
        Tag, on_delete=models.CASCADE, related_name="subtags", null=True, blank=True
    )

    def __str__(self):
        """
        Returns a string representation of the sub-tag.
        """
        return self.sub_tag

    class Meta:
        verbose_name = "Sub Tag"
        verbose_name_plural = "Sub Tags"


class FounderSocialToSocial(models.Model):
    """
    Model representing a social media link for a founder.
    """

    social_media = models.CharField(max_length=255, blank=True, null=True)
    founder = models.ForeignKey(Founder, on_delete=models.CASCADE)
    link = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.founder}-{self.social_media}"

    class Meta:
        verbose_name = "Founder Social"
        verbose_name_plural = "Founder Socials"


class OpenaiDescription(models.Model):
    """
    Model representing a generated description for a company.
    """

    company = models.ForeignKey(
        "Company", related_name="openai_descriptions", on_delete=models.CASCADE
    )
    prompt = RichTextField(blank=True)
    generated_text = RichTextField(blank=True, null=True)

    class Meta:
        verbose_name = "Generated Description"
        verbose_name_plural = "Generated Descriptions"

    def __str__(self):
        return self.company.company_name

    _loaded_prompt = None

    @classmethod
    def from_db(cls, db, field_names, values):
        instance = super().from_db(db, field_names, values)
        instance._loaded_prompt = instance.__dict__.get("prompt")
        return instance

    def save(self, *args, **kwargs):
        """Draft the text when there is a new or changed prompt.

        This used to call the OpenAI completions API on *every* save (so any edit of a note
        cost money, and a network error made the save fail). Now it asks only when the prompt
        is new or changed, and a failure is logged and the description is saved without text.
        """
        if self.prompt and (not self.generated_text or self.prompt != self._loaded_prompt):
            try:
                self.generated_text = generate_text(strip_tags(self.prompt))
            except GenerationUnavailable as error:
                logger.warning("No generated text for company %s: %s", self.company_id, error)
        super().save(*args, **kwargs)
        self._loaded_prompt = self.prompt
