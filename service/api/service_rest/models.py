from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=300, primary_key=True)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)


class Appointment(models.Model):
    vin = models.CharField(max_length=300)
    status = models.PositiveSmallIntegerField(default=0)
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=300)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(Technician,
                                   related_name='appointments',
                                   on_delete=models.PROTECT)
