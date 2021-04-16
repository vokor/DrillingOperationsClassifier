"""WellDrilling URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from api.viewsets import (
    OperationViewSet,
    UnitViewSet,
    SourceViewSet,
    BranchViewSet,
    TechParamViewSet,
    WellViewSet,
    DrillingOperationViewSet,
    UploadViewSet,
    drilling_operations_table,
    well_drillling_dates,
)
from rest_framework import routers

from WellDrilling.views import index

router = routers.DefaultRouter()

router.register('operations',OperationViewSet)
router.register('units',UnitViewSet)
router.register('branches',BranchViewSet)
router.register('sources',SourceViewSet)
router.register('techparams',TechParamViewSet)
router.register('wells',WellViewSet)
router.register('drillingoperations',DrillingOperationViewSet)
router.register('handlefile', UploadViewSet, basename='api/handlefile')

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/drillings/', drilling_operations_table),
    path('api/drilldates/', well_drillling_dates)
]
