"""Read-only API. The directory (companies, tags, regions, socials, founders) is public; the
administrative notes and the generated descriptions are internal and need a staff login. The
default permission is ``IsAdminUser``, so anything not marked ``AllowAny`` is private."""

from rest_framework import generics
from rest_framework.permissions import AllowAny

from pages.models import (
    AdminNotes,
    Company,
    Founder,
    FounderSocialToSocial,
    OpenaiDescription,
    Region,
    Social,
    SubTag,
    Tag,
)
from pages.serializers import (
    AdminNotesSerializer,
    CompanySerializer,
    FounderSerializer,
    FounderSocialSerializer,
    OpenaiDescriptionSerializer,
    RegionSerializer,
    SocialSerializer,
    SubTagSerializer,
    TagSerializer,
)


class PublicList(generics.ListAPIView):
    permission_classes = [AllowAny]


class PublicDetail(generics.RetrieveAPIView):
    permission_classes = [AllowAny]


class CompanyListView(PublicList):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailView(PublicDetail):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class SocialListView(PublicList):
    queryset = Social.objects.select_related("company")
    serializer_class = SocialSerializer


class SocialDetailView(PublicDetail):
    queryset = Social.objects.select_related("company")
    serializer_class = SocialSerializer


class FounderSocialListView(PublicList):
    queryset = FounderSocialToSocial.objects.all()
    serializer_class = FounderSocialSerializer


class FounderSocialDetailView(PublicDetail):
    queryset = FounderSocialToSocial.objects.all()
    serializer_class = FounderSocialSerializer


class FounderListView(PublicList):
    queryset = Founder.objects.prefetch_related("foundersocialtosocial_set")
    serializer_class = FounderSerializer


class FounderDetailView(PublicDetail):
    queryset = Founder.objects.prefetch_related("foundersocialtosocial_set")
    serializer_class = FounderSerializer


class RegionListView(PublicList):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class RegionDetailView(PublicDetail):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class TagListView(PublicList):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetailView(PublicDetail):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class SubTagListView(PublicList):
    queryset = SubTag.objects.all()
    serializer_class = SubTagSerializer


class SubTagDetailView(PublicDetail):
    queryset = SubTag.objects.all()
    serializer_class = SubTagSerializer


# ----- internal: staff only (the project default permission) ----------------------------------
class AdminNotesListView(generics.ListAPIView):
    queryset = AdminNotes.objects.all()
    serializer_class = AdminNotesSerializer


class AdminNotesDetailView(generics.RetrieveAPIView):
    queryset = AdminNotes.objects.all()
    serializer_class = AdminNotesSerializer


class OpenaiDescriptionListView(generics.ListAPIView):
    queryset = OpenaiDescription.objects.all()
    serializer_class = OpenaiDescriptionSerializer


class OpenaiDescriptionDetailView(generics.RetrieveAPIView):
    queryset = OpenaiDescription.objects.all()
    serializer_class = OpenaiDescriptionSerializer
