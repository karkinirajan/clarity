from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView

# Serve Nuxt Application
index_view = never_cache(TemplateView.as_view(template_name="index.html"))

# Serve robot.txt from Nuxt
robots = never_cache(TemplateView.as_view(template_name="robots.txt"))
manifest = never_cache(TemplateView.as_view(template_name="nuxt.config.js"))
service_worker = never_cache(
    TemplateView.as_view(template_name="sw.js", content_type="text/javascript")
)
