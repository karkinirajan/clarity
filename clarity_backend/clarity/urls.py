from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("pages.urls")),
    path("health/", views.health, name="health"),
]

if settings.API_DOCS_ENABLED:
    urlpatterns += [
        path("", RedirectView.as_view(pattern_name="swagger-ui"), name="index"),
        path("swagger/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "swagger/docs/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
        path(
            "swagger/schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),
    ]

if settings.DEBUG:
    urlpatterns += [path("api-auths/", include("rest_framework.urls"), name="rest_framework")]
    # In production the reverse proxy serves /media/ (and WhiteNoise serves /static/).
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    try:
        import debug_toolbar
    except ImportError:
        pass
    else:
        if "debug_toolbar" in settings.INSTALLED_APPS:
            urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
