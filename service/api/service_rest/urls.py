from django.urls import path
from .views import (list_technicians, detail_technician, list_appointments,
                    detail_appointment)

urlpatterns = [
    path('technicians/', list_technicians, name='list_technicians'),
    path('technicians/<int:id>/', detail_technician, name='detail_technician'),
    path('appointments/', list_appointments, name='list_appointments'),
    path('appointments/<int:id>/', detail_appointment, name='detail_appointment'),
    path('appointments/<int:id>/<action>/',
         detail_appointment,
         name='detail_appointment_action'),
]
