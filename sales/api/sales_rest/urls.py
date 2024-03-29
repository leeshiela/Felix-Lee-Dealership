from django.urls import path
from .views import api_salespeople_list, api_salesperson_delete, api_customers_list, api_customer_delete, api_sales_list, api_sale_delete

urlpatterns = [
    path("salespeople/", api_salespeople_list, name="api_salespeople_list"),
    path("salespeople/<int:pk>/", api_salesperson_delete, name="api_salesperson_delete"),
    path("customers/", api_customers_list, name="api_customers_list"),
    path("customers/<int:pk>/", api_customer_delete, name="api_customer_delete"),
    path("sales/", api_sales_list, name="api_sales_list"),
    path("sales/<int:pk>/", api_sale_delete, name="api_sale_delete"),
]
