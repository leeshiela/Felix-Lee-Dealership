# Generated by Django 4.0.3 on 2024-02-13 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0002_automobile_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='manufacturer',
            name='picture_url',
            field=models.URLField(null=True),
        ),
    ]
