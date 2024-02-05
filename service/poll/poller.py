import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
from service_rest.models import AutomobileVO
auto_url = 'http://inventory-api:8000/api/automobiles/'

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            resp = requests.get(auto_url)
            content = json.loads(resp.content)
            [AutomobileVO.objects.update_or_create(
                vin=aut['vin'],
                sold=aut['sold'])
             for aut in content['autos']]
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
