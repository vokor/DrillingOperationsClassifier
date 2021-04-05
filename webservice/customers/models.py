from django.db import models

class Customer(models.Model):
    date = models.CharField("skip", max_length=255)
    begin_time = models.CharField("skip", max_length=255)
    end_time = models.CharField("skip", max_length=255)
    bit_begin = models.CharField("skip", max_length=255)
    bit_end = models.CharField("skip", max_length=255)
    candles = models.CharField("skip", max_length=255)
    operation = models.CharField("skip", max_length=255)
    tech_parameters = models.CharField("skip", max_length=255)
    bottomhole_begin = models.CharField("skip", max_length=255)
    bottomhole_end = models.CharField("skip", max_length=255)
    source_name = models.CharField("skip", max_length=255)

    def __str__(self):
        return self.operation
