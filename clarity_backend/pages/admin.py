from django.contrib import admin
from .models import (
    Company,
    Tag,
    Founder,
    SubTag,
    FounderSocialToSocial,
    Social,
    OpenaiDescription,
    AdminNotes,
    Region,
)
from import_export.admin import ImportExportModelAdmin


class OpenaiDescriptionInline(admin.StackedInline):
    model = OpenaiDescription
    extra = 0
    max_num = 10


class AdminNotesInline(admin.StackedInline):
    model = AdminNotes
    extra = 0
    max_num = 20


@admin.register(Company)
class CompanyAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    inlines = [
        OpenaiDescriptionInline,
        AdminNotesInline,
    ]
    search_fields = ("company_name", "team_size", "location", "company")


admin.site.register(AdminNotes)
admin.site.register(OpenaiDescription)
admin.site.register(FounderSocialToSocial)
admin.site.register(Social)
admin.site.register(Founder)
admin.site.register(Tag)
admin.site.register(SubTag)
admin.site.register(Region)
