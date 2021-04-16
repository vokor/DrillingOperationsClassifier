from django.db import models

class Operation(models.Model):
    name = models.CharField(max_length=128, verbose_name='Название операции', unique=True)
    color = models.CharField(max_length=128, verbose_name='Цвет операции', null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Операцию'
        verbose_name_plural = 'Словарь операций'

class Source(models.Model):
    name = models.CharField(max_length=128, verbose_name='Название источника')

    class Meta:
        verbose_name = 'Источник'
        verbose_name_plural = 'Словарь источников'

    def __str__(self):
        return self.name

class Branch(models.Model):
    name = models.CharField(max_length=128, verbose_name='Название филиала')

    class Meta:
        verbose_name = 'Филиал'
        verbose_name_plural = 'Словарь филиалов'

    def __str__(self):
        return self.name

class Well(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, verbose_name='Филиал')
    name = models.CharField(max_length=128, verbose_name='Название скважины')
    drill_start_date = models.DateField(verbose_name='Дата начала строительства',blank=True, null=True)
    drill_start_time = models.TimeField(verbose_name='Время начала строительства',blank=True, null=True)
    drill_end_date = models.DateField(verbose_name='Дата окончания строительства',blank=True, null=True)
    drill_end_time = models.TimeField(verbose_name='Время окончания строительства',blank=True, null=True)

    class Meta:
        verbose_name = 'Скважину'
        verbose_name_plural = 'Словарь скважин'

    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=128, verbose_name='Ед. изм. тех. параметра')

    class Meta:
        verbose_name = 'Единицу измерения'
        verbose_name_plural = 'Словарь ед. измерения'

    def __str__(self):
        return self.name

class TechParam(models.Model):
    name = models.CharField(max_length=128, verbose_name='Название тех. параметра')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, verbose_name='Ед. изм. тех. параметра')

    class Meta:
        verbose_name = 'Тех. параметр'
        verbose_name_plural = 'Словарь тех.параметров'

    def __str__(self):
        return '{}({})'.format(self.name, self.unit.name)

class DrillingOperation(models.Model):
    well = models.ForeignKey(Well, on_delete=models.CASCADE, verbose_name='Скважина')
    drill_date = models.DateField(verbose_name='Дата')
    time_start = models.TimeField(verbose_name='Начало (время)')
    time_end = models.TimeField(verbose_name='Окончание (время)')
    duration = models.DurationField(verbose_name='Длительность (мин.)')
    chisel_depth_start = models.DecimalField(
        decimal_places=6,
        max_digits=12,
        verbose_name='Глубина долота на начало операции'
    )
    chisel_depth_end = models.DecimalField(
        decimal_places=6,
        max_digits=12,
        verbose_name='Глубина долота на окончание операции'
    )
    candles_amount = models.PositiveIntegerField(verbose_name='Количество свечей')
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Операция')
    tech_params = models.ManyToManyField(TechParam, through='DrillingOperationTechParams', verbose_name='Тех. параметры')
    slaughter_depth_start = models.DecimalField(
        decimal_places=6,
        max_digits=12,
        verbose_name='Глубина забоя на начало операции'
    )
    slaughter_depth_end = models.DecimalField(
        decimal_places=6,
        max_digits=12,
        verbose_name='Глубина забоя на окончание операции'
    )
    source = models.ForeignKey(Source, on_delete=models.CASCADE, verbose_name='Источник')

    class Meta:
        verbose_name = 'Операцию бурения скважины'
        verbose_name_plural = 'Операции бурения скважин'

    def __str__(self):
        if self.operation:
            return 'Операция "{}" для скважины "{}"'.format(self.operation.name, self.well.name)
        else:
            return 'Операция для скважины "{}"'.format(self.well.name)

class DrillingOperationTechParams(models.Model):
    operation = models.ForeignKey(DrillingOperation, models.CASCADE, related_name='operation_to_param', verbose_name='Операция бурения')
    param = models.ForeignKey(TechParam, models.CASCADE, related_name='param_to_operation', verbose_name='Полное название тех. параметра')
    value = models.DecimalField(
        decimal_places=6,
        max_digits=12,
        verbose_name='Значение тех. параметра'
    )

    class Meta:
        unique_together = [
            ('operation', 'param'),
        ]
        verbose_name = 'Тех. параметр операции бурения скважины'
        verbose_name_plural = 'Тех. параметры операции бурения скважины'

    def __str__(self):
        return self.param.__str__()