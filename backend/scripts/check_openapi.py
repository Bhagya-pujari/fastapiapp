import json
from urllib.request import urlopen

def main():
    url = "http://127.0.0.1:8000/openapi.json"
    try:
        with urlopen(url, timeout=5) as r:
            data = json.load(r)
    except Exception as e:
        print("ERROR_FETCH_OPENAPI", e)
        return
    paths = data.get("paths", {})
    if "/auth/login" in paths:
        print("FOUND /auth/login in openapi")
    else:
        print("MISSING /auth/login in openapi")

if __name__ == '__main__':
    main()
