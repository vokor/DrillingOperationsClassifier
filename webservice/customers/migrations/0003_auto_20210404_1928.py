# Generated by Django 3.1.7 on 2021-04-04 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_classifier'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='address',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='createdAt',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='description',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='email',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='phone',
        ),
        migrations.AddField(
            model_name='customer',
            name='begin_time',
            field=models.CharField(default='', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='bit_begin',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='bit_end',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='bottomhole_begin',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='bottomhole_end',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='candles',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='date',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='end_time',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='operation',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='source_name',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='tech_parameters',
            field=models.CharField(default='1', max_length=255, verbose_name='skip'),
            preserve_default=False,
        ),
    ]