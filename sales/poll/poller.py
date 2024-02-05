import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO
# from sales_rest.models import Something
def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)

    [AutomobileVO.objects.update_or_create(
        VIN = automobile["VIN"],
        sold = automobile["sold"],
        ) for automobile in content["autos"]]


def poll():
    while True:
        print('Sales poller polling for data')
        try:
           get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
