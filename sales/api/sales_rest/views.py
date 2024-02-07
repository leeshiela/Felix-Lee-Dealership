from .models import AutomobileVO, Salesperson, Customer, Sale
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from django.http import JsonResponse
import requests


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


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "customer",
        "salesperson",
    ]
    encoders = {
        "automobile": AutomobileVOListEncoder(),
        "customer": CustomerListEncoder(),
        "salesperson": SalespeopleListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_salespeople_list(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": salespeople}, encoder=SalespeopleListEncoder
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespeopleListEncoder,
                safe=False,
            )
        except:
            return JsonResponse({"message": "Could not create"})


@require_http_methods(["DELETE"])
def api_salesperson_delete(request, pk):
    try:
        if request.method == "DELETE":
            count, _ = Salesperson.objects.filter(employee_id=pk).delete()
            return JsonResponse({"deleted": count > 0})
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Salesperson does not exist."})


@require_http_methods(["GET", "POST"])
def api_customers_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except:
            return JsonResponse({"message": "Could not create"}, status=400)


@require_http_methods(["DELETE"])
def api_customer_delete(request, pk):
    try:
        if request.method == "DELETE":
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count >0})
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer does not exist."}, status=404)


@require_http_methods(["GET", "POST"])
def api_sales_list(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                status=400,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )
        try:
            employee_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            content["salesperson"] = salesperson
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=400,
            )
        try:
            url = f"http://inventory-api:8000/api/automobiles/{vin}/"
            response = requests.put(url, json={"sold": True})
            if response.status_code != 200:
                raise KeyError
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False,
            )
        except (KeyError):
            return JsonResponse(
                {"message": "Sold not updated"},
                status=400,
            )
        except:
            url = f"http://inventory-api:8000/api/automobiles/{vin}/"
            response = requests.put(url, json={"sold": False})
            return JsonResponse(
                {"message": "Could not create"},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_sale_delete(request, pk):
    try:
        if request.method == "DELETE":
            count, _ = Sale.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
    except Sale.DoesNotExist:
        return JsonResponse({"message": "Sale does not exist."}, status=404)
