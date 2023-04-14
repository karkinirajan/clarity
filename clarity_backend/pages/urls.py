from django.urls import path

from pages.views.api_views import (
    CompanyListView,
    CompanyDetailView,
    AdminNotesListView,
    AdminNotesDetailView,
    RegionListView,
    SocialListView,
    SocialDetailView,
    FounderSocialListView,
    FounderSocialDetailView,
    FounderListView,
    FounderDetailView,
    TagListView,
    TagDetailView,
    SubTagListView,
    SubTagDetailView,
    OpenaiDescriptionListView,
    OpenaiDescriptionDetailView,
)

app_name = "pages"

urlpatterns = [
    path("companies/", CompanyListView.as_view(), name="company-list"),
    path(
        "companies/<int:pk>/",
        CompanyDetailView.as_view(),
        name="company-detail",
    ),
    path("admin-notes/", AdminNotesListView.as_view(), name="admin-notes-list"),
    path(
        "admin-notes/<int:pk>/",
        AdminNotesDetailView.as_view(),
        name="admin-notes-detail",
    ),
    path("socials/", SocialListView.as_view(), name="social-list"),
    path("socials/<int:pk>/", SocialDetailView.as_view(), name="social-detail"),
    path(
        "founder-socials/",
        FounderSocialListView.as_view(),
        name="founder-social-list",
    ),
    path(
        "founder-socials/<int:pk>/",
        FounderSocialDetailView.as_view(),
        name="founder-social-detail",
    ),
    path("founders/", FounderListView.as_view(), name="founder-list"),
    path(
        "founders/<int:pk>/",
        FounderDetailView.as_view(),
        name="founder-detail",
    ),
    path("regions/", RegionListView.as_view(), name="region-list"),
    path("regions/<int:pk>/", RegionListView.as_view(), name="region-detail"),
    path("tags/", TagListView.as_view(), name="tag-list"),
    path("tags/<int:pk>/", TagDetailView.as_view(), name="tag-detail"),
    path("subtags/", SubTagListView.as_view(), name="subtag-list"),
    path("subtags/<int:pk>/", SubTagDetailView.as_view(), name="subtag-detail"),
    path(
        "openai-descriptions/",
        OpenaiDescriptionListView.as_view(),
        name="openai-description-list",
    ),
    path(
        "openai-descriptions/<int:pk>/",
        OpenaiDescriptionDetailView.as_view(),
        name="openai-description-detail",
    ),
]
