from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer 
        fields = ('pk','date', 'begin_time', 'end_time', 'bit_begin','bit_end','candles',
                  'operation', 'tech_parameters', 'bottomhole_begin', 'bottomhole_end', 'source_name')
