from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=300, primary_key=True)
    sold = models.BooleanField(default=False)

class Salesperson(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.TextField()
    phone_number = models.PositiveIntegerField()

class Sale(models.Model):
    price = models.DecimalField(max_digits=8, decimal_places=2)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE,
    )
