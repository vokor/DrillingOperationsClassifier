from rest_framework import serializers
from .models import (
    Operation,
    Unit,
    Source,
    Branch,
    TechParam,
    Well,
    DrillingOperation,
    DrillingOperationTechParams,
)
from api.utils import format_tech_param


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = '__all__'


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


class TechParamsSerializer(serializers.ModelSerializer):
    unit = UnitSerializer()

    class Meta:
        model = TechParam
        fields = '__all__'


class DrilingOperationTechParamsSerializer(serializers.ModelSerializer):
    param = TechParamsSerializer()

    class Meta:
        model = DrillingOperationTechParams
        fields = ('id', 'param', 'value')  # '__all__'


class WellSerializer(serializers.ModelSerializer):
    branch = BranchSerializer()

    class Meta:
        model = Well
        fields = '__all__'


class DrillingOperationSerializer(serializers.ModelSerializer):
    tech_params = DrilingOperationTechParamsSerializer(source='operation_to_param', many=True, read_only=True)
    source = SourceSerializer()
    operation = OperationSerializer()
    well = WellSerializer()

    class Meta:
        model = DrillingOperation
        fields = '__all__'


class UploadSerializer(serializers.Serializer):
    well_id = serializers.IntegerField()
    source_id = serializers.IntegerField()
    file_uploaded = serializers.FileField()

    class Meta:
        fields = ['file_uploaded']
