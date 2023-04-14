from rest_framework import generics
from pages.models import (
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
from pages.serializers import (
    AdminNotesSerializer,
    SocialSerializer,
    FounderSocialSerializer,
    FounderSerializer,
    RegionSerializer,
    TagSerializer,
    SubTagSerializer,
    CompanySerializer,
    OpenaiDescriptionSerializer,
)
from pages.utils import upload_images_from_csv


class CompanyListView(generics.ListAPIView):
    # upload_images_from_csv()

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class AdminNotesListView(generics.ListAPIView):
    queryset = AdminNotes.objects.all()
    serializer_class = AdminNotesSerializer


class AdminNotesDetailView(generics.RetrieveAPIView):
    queryset = AdminNotes.objects.all()
    serializer_class = AdminNotesSerializer


class SocialListView(generics.ListAPIView):
    queryset = Social.objects.all()
    serializer_class = SocialSerializer


class SocialDetailView(generics.RetrieveAPIView):
    queryset = Social.objects.all()
    serializer_class = SocialSerializer


class FounderSocialListView(generics.ListAPIView):
    queryset = FounderSocialToSocial.objects.all()
    serializer_class = FounderSocialSerializer


class FounderSocialDetailView(generics.RetrieveAPIView):
    queryset = FounderSocialToSocial.objects.all()
    serializer_class = FounderSocialSerializer


class FounderListView(generics.ListAPIView):
    queryset = Founder.objects.all()
    serializer_class = FounderSerializer


class FounderDetailView(generics.RetrieveAPIView):
    queryset = Founder.objects.all()
    serializer_class = FounderSerializer


class RegionListView(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class RegionDetailView(generics.RetrieveAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetailView(generics.RetrieveAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class SubTagListView(generics.ListAPIView):
    queryset = SubTag.objects.all()
    serializer_class = SubTagSerializer


class SubTagDetailView(generics.RetrieveAPIView):
    queryset = SubTag.objects.all()
    serializer_class = SubTagSerializer


class OpenaiDescriptionListView(generics.ListAPIView):
    queryset = OpenaiDescription.objects.all()
    serializer_class = OpenaiDescriptionSerializer


class OpenaiDescriptionDetailView(generics.RetrieveAPIView):
    queryset = OpenaiDescription.objects.all()
    serializer_class = OpenaiDescriptionSerializer
