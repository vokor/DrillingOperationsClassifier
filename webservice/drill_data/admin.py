from django.contrib import admin

from .models import User, Operation, OperationClass, DrillFloor

admin.site.register(User)
admin.site.register(Operation)
admin.site.register(OperationClass)
admin.site.register(DrillFloor)
