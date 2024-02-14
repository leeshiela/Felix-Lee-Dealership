import json
from .keys import PEXELS_API_KEY
import requests

def get_photo(name):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {"per_page": 1, "query": name}
    url = f"https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)

    content = json.loads(response.content)
    try:
        return content["photos"][0]["src"]["landscape"]
    except (KeyError, IndexError):
        return None
