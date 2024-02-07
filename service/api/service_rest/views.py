from django.http import JsonResponse

from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold']


class ListTechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
        "first_name",
        "last_name",
    ]


class ListAppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'id',
        "vin",
        "customer",
        "date_time",
        "technician",
        'reason',
        'status'
    ]
    encoders = {'technician': ListTechnicianEncoder()}


@require_http_methods(['GET', 'POST'])
def list_technicians(request):
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"technicians": techs},
            encoder=ListTechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            tech = Technician.objects.create(**content)
            return JsonResponse(
                tech,
                encoder=ListTechnicianEncoder,
                safe=False,
            )
        except:
            return JsonResponse({"message": "Could not create"}, status_code=400)


@require_http_methods(['DELETE'])
def detail_technician(request, id):
    try:
        count, _ = Technician.objects.filter(employee_id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Technician.DoesNotExist:
        response = JsonResponse({"message": "Does not exist"})
        response.status_code = 404
        return response


@require_http_methods(['GET', 'POST'])
def list_appointments(request):
    if request.method == "GET":
        try:
            apps = Appointment.objects.all()
            return JsonResponse(
                {"appointments": apps},
                encoder=ListAppointmentEncoder,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        content = json.loads(request.body)
        try:
            tech = Technician.objects.get(employee_id=content['technician'])
            content['technician'] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )
        try:
            app = Appointment.objects.create(**content)
            return JsonResponse(
                app,
                encoder=ListAppointmentEncoder,
                safe=False,
            )
        except:
            return JsonResponse({"message": "Could not create"}, status=400)


@require_http_methods(['PUT', 'DELETE'])
def detail_appointment(request, id, action=None):
    if request.method == 'PUT':
        allowed_status = {
                'pending': 0,
                'finish': 1,
                'cancel': 2
                }
        try:
            app = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

        if action not in allowed_status:
            return JsonResponse(
                {"message": "Invalid status action"},
                status=400,
            )
        app.status = allowed_status[action]
        app.save()

        return JsonResponse(app, encoder=ListAppointmentEncoder, safe=False)
    else:
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
