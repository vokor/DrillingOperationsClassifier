from rest_framework import serializers


class OperationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128)
