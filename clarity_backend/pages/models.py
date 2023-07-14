import os

import openai
from ckeditor.fields import RichTextField
from django.db import models
from dotenv import find_dotenv, load_dotenv

_ = load_dotenv(find_dotenv())
openai_api_key = os.getenv("OPENAI_API_KEY")


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

    company = models.ForeignKey(
        Company, related_name="admin_notes", on_delete=models.CASCADE
    )
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
    company = models.ForeignKey(
        Company, related_name="socials", on_delete=models.CASCADE
    )

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
    company = models.ForeignKey(
        Company, related_name="founders", on_delete=models.CASCADE
    )

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
    company = models.ForeignKey(
        Company, related_name="regions", on_delete=models.CASCADE
    )

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
    company = models.ForeignKey(
        Company, related_name="subtags", on_delete=models.CASCADE
    )
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

    def save(self, *args, **kwargs):
        openai.api_key = openai_api_key  #  "set your key like this"  # Set API key
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=self.prompt,
            max_tokens=1024,
            temperature=0.5,
            top_p=1,
            n=1,
            stop=None,
            frequency_penalty=0,
            presence_penalty=0,
        )
        self.generated_text = response.choices[0].text.strip()
        super().save(*args, **kwargs)
