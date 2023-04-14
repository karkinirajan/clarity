from rest_framework import serializers
from .models import (
    Company,
    AdminNotes,
    Region,
    Social,
    Founder,
    Tag,
    SubTag,
    FounderSocialToSocial,
    OpenaiDescription,
)

from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = (
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
        )


class AdminNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminNotes
        fields = ("id", "note", "company")


class SocialSerializer(serializers.ModelSerializer):
    company = serializers.CharField(source="company.company_name", read_only=True)

    class Meta:
        model = Social
        fields = ["id", "social_media", "link", "company"]


class FounderSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = FounderSocialToSocial
        fields = ("id", "social_media", "link")


class FounderSerializer(serializers.ModelSerializer):
    foundersocialtosocial_set = FounderSocialSerializer(many=True)

    class Meta:
        model = Founder
        fields = ("id", "name", "role", "company", "foundersocialtosocial_set")


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ("id", "region", "company")


class TagSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Tag
        fields = ("id", "name", "company")


class SubTagSerializer(serializers.ModelSerializer):
    tag = serializers.PrimaryKeyRelatedField(read_only=True)
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SubTag
        fields = ("id", "sub_tag", "tag", "company")


class OpenaiDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenaiDescription
        fields = ("id", "company", "prompt", "generated_text")
