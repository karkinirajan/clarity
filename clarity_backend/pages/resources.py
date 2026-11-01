from import_export import resources
from .models import (
    Company,
    Founder,
    Tag,
    SubTag,
    FounderSocialToSocial,
)


class CompanyResource(resources.ModelResource):
    class Meta:
        model = Company


class FounderResource(resources.ModelResource):
    class Meta:
        model = Founder


class TagResource(resources.ModelResource):
    class Meta:
        model = Tag


class SubTagResource(resources.ModelResource):
    class Meta:
        model = SubTag


class FounderSocialToSocialResource(resources.ModelResource):
    class Meta:
        model = FounderSocialToSocial
