import datetime
import io
import json
from pprint import pprint
from api.models import DrillingOperation, TechParam, DrillingOperationTechParams


def parallel_drillingoperation_create(well_id: int, source_id: int, data: list):
    instances = []
    for item in data:
        params = item.pop('tech_params')
        item.update({
            'well_id': well_id,
            'source_id': source_id
        })
        dr_op_instance = DrillingOperation.objects.create(**item)
        for param in params:
            p = TechParam.objects.get(id=param.pop('param_id'))
            DrillingOperationTechParams.objects.create(
                operation=dr_op_instance,
                param=p,
                value=param.pop('value')
            )
        instances.append(dr_op_instance)
    return instances


def get_drilling_tech_param(dr_op: DrillingOperation, p: TechParam):
    return DrillingOperationTechParams.objects.get(operation=dr_op, param=p)


def format_tech_param(dr_op: DrillingOperation, p: TechParam):
    param = get_drilling_tech_param(dr_op, p)
    return r"{}={} {}".format(p.name, param.value, p.unit.name)


def get_day_part_time_range(part):
    if part == 'morning':
        return ('04:00:00', '11:59:59')
    elif part == 'afternoon':
        return ('12:00:00', '16:59:59')
    elif part == 'evening':
        return ('17:00:00', '23:59:59')
    elif part == 'night':
        return ('00:00:00', '03:59:59')
    else:  # full time
        return ('00:00:00', '23:59:59')


def drilling_operation_to_json(dr_op: DrillingOperation):
    if dr_op:
        if isinstance(dr_op.duration, datetime.timedelta):
            mins, secs = divmod(dr_op.duration.total_seconds(), 60)
        else:
            h_s, m_s, s_s = dr_op.duration.split(':')
            total_seconds = int(h_s) * 3600 + int(m_s) * 60 + int(s_s)
            mins, secs = divmod(total_seconds, 60)
        result = {
            "well": dr_op.well.name if dr_op.well else "",
            "source": dr_op.source.name if dr_op.source else "",
            "drill_date": dr_op.drill_date,
            "time_start": dr_op.time_start,
            "time_end": dr_op.time_end,
            "duration": '{}.{}'.format(int(mins), int(secs) if secs > 9 else '0{}'.format(int(secs))),
            "chisel_depth_start": dr_op.chisel_depth_start,
            "chisel_depth_end": dr_op.chisel_depth_end,
            "candles_amount": dr_op.candles_amount,
            "slaughter_depth_start": dr_op.slaughter_depth_start,
            "slaughter_depth_end": dr_op.slaughter_depth_end,
        }
        if dr_op.operation:
            result["operation"] = {
                "name": dr_op.operation.name,
                "color": dr_op.operation.color,
            }
        else:
            result["operation"] = None
        if params := dr_op.tech_params.all():
            result["tech_params"] = [format_tech_param(dr_op, p) for p in params]
        else:
            result["tech_params"] = []
        return result
    else:
        return {}


def get_drillings_table(well_id: int, params: dict):
    if drillings := DrillingOperation.objects.filter(well_id=well_id):
        if date := params.pop('drill_date', None):
            drillings = drillings.filter(drill_date__exact=date)
        if day_part := params.pop('day_part', None):
            tstart_s, tend_s = get_day_part_time_range(day_part)
            drillings = drillings.filter(time_start__gte=tstart_s).filter(time_end__lte=tend_s)
        drillings = drillings.order_by('-drill_date', '-time_start', '-time_end')
        json_operations = [drilling_operation_to_json(item) for item in drillings]
        return json_operations


def format_drill_dates_list(drill_dates):
    return [{'id': item.get('drill_date').isoformat(), 'name': item.get('drill_date').isoformat()} for item in
            drill_dates]


def get_well_drill_dates(well_id: int, distinct=True):
    if drill_dates := DrillingOperation.objects.filter(well_id=well_id):
        if distinct:
            drill_dates = drill_dates.distinct()
        return drill_dates.order_by('-drill_date').values('drill_date')
    else:
        return []


def to_json(item_value):
    if isinstance(item_value, str):
        try:
            obj = json.loads(item_value)
            return obj
        except ValueError as e:
            return item_value
    else:
        return item_value


def csv_file_reader(raw_file):
    result = []
    lines = raw_file.split('\n')
    columns = []
    for idx in range(len(lines)):
        if idx == 0:
            columns.extend(lines[idx].split(';'))
        elif idx != len(lines) - 1:
            result.extend(
                [dict(zip(columns, map(to_json, lines[idx].split(';'))))]
            )
    return result
