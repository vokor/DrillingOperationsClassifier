from django.contrib import admin

from api import models


class ParametersInline(admin.TabularInline):
    model = models.DrillingOperationTechParams
    extra = 0


class DrillingOperationAdmin(admin.ModelAdmin):
    inlines = [ParametersInline]


admin.site.register(models.Branch)
admin.site.register(models.Source)
admin.site.register(models.Operation)
admin.site.register(models.Well)
admin.site.register(models.DrillingOperation, DrillingOperationAdmin)
admin.site.register(models.TechParam)
admin.site.register(models.Unit)
admin.site.register(models.DrillingOperationTechParams)
