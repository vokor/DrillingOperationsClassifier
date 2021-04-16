from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework import filters
from rest_framework.response import Response
from django.http import JsonResponse

from api import models
from api import serializers
from api.utils import (
    get_drillings_table,
    get_well_drill_dates,
    parallel_drillingoperation_create,
    drilling_operation_to_json,
    format_drill_dates_list,
    csv_file_reader,
)


class ModelFieldsFilter(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """

    def filter_queryset(self, request, queryset, view):
        params = request.query_params.dict()
        params.pop('format')
        return queryset.filter(**params)


class OperationViewSet(viewsets.ModelViewSet):
    queryset = models.Operation.objects.all()
    serializer_class = serializers.OperationSerializer
    filter_backends = [ModelFieldsFilter]


class UnitViewSet(viewsets.ModelViewSet):
    queryset = models.Unit.objects.all()
    serializer_class = serializers.UnitSerializer
    filter_backends = [ModelFieldsFilter]


class SourceViewSet(viewsets.ModelViewSet):
    queryset = models.Source.objects.all()
    serializer_class = serializers.SourceSerializer
    filter_backends = [ModelFieldsFilter]


class BranchViewSet(viewsets.ModelViewSet):
    queryset = models.Branch.objects.all()
    serializer_class = serializers.BranchSerializer
    filter_backends = [ModelFieldsFilter]


class TechParamViewSet(viewsets.ModelViewSet):
    queryset = models.TechParam.objects.all()
    serializer_class = serializers.TechParamsSerializer
    filter_backends = [ModelFieldsFilter]


class WellViewSet(viewsets.ModelViewSet):
    queryset = models.Well.objects.all()
    serializer_class = serializers.WellSerializer
    filter_backends = [ModelFieldsFilter]


class DrillingOperationViewSet(viewsets.ModelViewSet):
    queryset = models.DrillingOperation.objects.all()
    serializer_class = serializers.DrillingOperationSerializer
    filter_backends = [ModelFieldsFilter]


class UploadViewSet(viewsets.ViewSet):
    serializer_class = serializers.UploadSerializer

    def list(self, request):
        return Response({"result": "success"})

    def create(self, request):
        file_uploaded = request.FILES.get('file_uploaded')
        if file_uploaded.content_type != 'text/csv':
            return JsonResponse(
                {"success": False, "error": "Wrong content type({})".format(file_uploaded.content_type)})
        try:
            data = []
            with file_uploaded.file as f:
                raw_file = f.read().decode('utf-8').replace("'", '"')
                data.extend(csv_file_reader(raw_file))
            print(data)
            instances = parallel_drillingoperation_create(int(request.POST.get('well_id')),
                                                          int(request.POST.get('source_id')), data)
            json_operations = [drilling_operation_to_json(item) for item in instances]
            return JsonResponse({"success": True, "operations": json_operations})
        except Exception as e:
            return JsonResponse({"success": False, "error": e.__str__()})


@api_view(['GET'])
def drilling_operations_table(request):
    params = request.GET.dict()
    params.pop('format')
    well_id = params.pop("well_id")
    if drillings := get_drillings_table(well_id, params):
        return JsonResponse({"success": True, "drillings": drillings})
    return JsonResponse({"success": False, "error": "Something went wrong"})


@api_view(['GET'])
def well_drillling_dates(request):
    params = request.GET.dict()
    params.pop('format')
    well_id = params.pop("well_id")
    if drilling_dates := get_well_drill_dates(well_id):
        return JsonResponse({"success": True, "drill_dates": format_drill_dates_list(drilling_dates)})
    return JsonResponse({"success": False, "error": "Something went wrong"})
