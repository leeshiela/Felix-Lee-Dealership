from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from django.http import JsonResponse

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalespeopleListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "employee_id",
        "first_name",
        "last_name",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

@require_http_methods(["GET","POST"])
def api_salespeople_list(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople}, encoder=SalespeopleListEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespeopleListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_salesperson_delete(request, pk):
    try:
        if request.method == "DELETE":
            count, _ = Salesperson.objects.filter(employee_id=pk).delete()
            return JsonResponse({"deleted": count >0})
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Does not exist."})


@require_http_methods(["GET", "POST"])
def api_customers_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse (
            {"customers": customers},
            encoder=CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse (
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_customer_delete(request, pk):
    try:
        if request.method == "DELETE":
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count >0})
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Does not exist."})
