from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    Operation
)
from .serializers import (
    OperationSerializer
)


class OperationView(APIView):
    def get(self, request, pk):
        print(pk)
        operations = Operation.objects.all()
        serializer = OperationSerializer(operations, many=True)
        return Response({"operations": serializer.data})


