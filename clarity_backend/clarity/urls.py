from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from nuxt_app.views import index_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("pages.urls")),
]

urlpatterns += i18n_patterns()

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path("admin/doc/", include("django.contrib.admindocs.urls")),
        path("api-auths/", include("rest_framework.urls"), name="rest_framework"),
        path("__debug__/", include(debug_toolbar.urls)),
    ]

    urlpatterns += [
        # path('swagger/doc/', schema_view, name="docs"),
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

"""
Generates a regex with reverse lookup of urls including static an>
This regex is then used in re_path of Vue's index.html.
This is done to handle any django url without a trailing slash.
"""

urls = list()
if settings.STATIC_URL:
    static_url = settings.STATIC_URL
    if static_url != "/":
        static_url = static_url.strip("/")
    urls.append(static_url)

if settings.MEDIA_URL:
    media_url = settings.MEDIA_URL
    if media_url != "/":
        media_url = media_url.strip("/")
    urls.append(media_url)

for url in urlpatterns:
    urls.append(str(url.pattern).strip("/"))

pattern_base = f'(?!{"|".join(urls)})'
pattern_index = f"^{pattern_base}.*$"
# print(pattern_index)
urlpatterns += [
    re_path(pattern_index, index_view, name="Home"),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
