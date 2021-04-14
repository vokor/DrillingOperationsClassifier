from django.contrib import admin

from api import models

admin.site.register(models.Branch)
admin.site.register(models.Source)
admin.site.register(models.Operation)
admin.site.register(models.Well)
admin.site.register(models.DrillingOperation)
admin.site.register(models.TechParam)
admin.site.register(models.TechParamsDict)
admin.site.register(models.Unit)
