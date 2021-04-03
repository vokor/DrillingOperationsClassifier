from enum import Enum

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    patronymic = models.CharField(max_length=64)
    position = models.CharField(max_length=256)


class DrillFloor(models.Model):
    pass

#models.TextChoices
# class OperationClassNames(models.TextChoices):
#     DRILLING = 1, "Бурение"
#     LIFT = 2, "Подъем"
#     DESCENT = 3, "Спуск"
#     BUILDING_UP = 4, "Наращивание"
#     FIXED_STATE = 5, "Неподвижное состояние"
#     # Бурение
#     ROTARY_DRILLING = 6, "Роторное бурение"
#     LOAD_GENERATION_ROTARY = 7, "Выработка нагрузки (роторное бурение)"
#     ORIENTED_DRILLING = 8, "Направленное бурение" # FIXME
#     LOAD_GENERATION_ORIENTED = 9, "Выработка нагрузки (направленное бурение)"
#     # WEDGE_RETENTION = 2,  "Удержание на клиньях"
#     # # Спуск
#     # DESCENT_DRILL_PLUG = "Спуск бурильной свечи в скважину"
#     # DESCENT_DRILL_TRUMPET = "Спуск бурильной трубы в скважину"
#     # DESCENT_IN_WELL = "Спуск в скважину"
#     # DESCENT_CANDLE_ON_CANDLE_LEN = "Спуск свечи с вращением и циркуляцией на длину свечи"
#     # DESCENT_CANDLE_ON_TRUMPET_LEN = "Спуск свечи с вращением и циркуляцией на длину трубы"
#     # DESCENT_WITH_PROCESSING = "Спуск с проработкой"
#     # DESCENT_WITH_SPIN = "Спуск с вращением"
#     # # Подъем
#     # LIFT_DRILL_STRING_ON_CANDLE_LEN = "Подъем бурильной колонны на длину свечи"
#     # LIFT_DRILL_STRING_ON_TRUMPET_LEN = "Подъем бурильной колонны на длину трубы"
#     # LIFT_FROM_WELL = "Подъем из скважины"
#     # LIFT_CANDLE_ON_CANDLE_LEN = "Подъем свечи с вращением и циркуляцией на длину свечи"
#     # LIFT_CANDLE_ON_TRUMPET_LEN = "Подъем бурильной колонны с вращением и циркуляцией на длину трубы"
#     # LIFT_WITH_PROCESSING = "Подъем с проработкой"
#     # LIFT_WITH_FLUSHING = "Подъем с промывкой"
#     # LIFT_WITH_REVOLVING = "Подъем с вращением"


class OperationClass(models.Model):
    base_class = models.ForeignKey("self", on_delete=models.PROTECT, null=True, blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class DrillFloor(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    director = models.ForeignKey(User, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Operation(models.Model):
    op_class = models.ForeignKey(OperationClass, on_delete=models.PROTECT)
    drill_floor = models.ForeignKey(DrillFloor, on_delete=models.PROTECT)
    feature = models.FloatField(verbose_name='Нагрузка на крюке')
    date_time = models.DateTimeField(auto_created=True)
    base_file = models.FileField(upload_to='data/')

    def __str__(self):
        return f'{self.drill_floor.name} {self.date_time.strftime("%d.%m.%Y %H:%M")}'

