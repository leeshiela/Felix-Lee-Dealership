# Generated by Django 4.0.3 on 2024-02-05 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_alter_salesperson_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.PositiveIntegerField(),
        ),
    ]
