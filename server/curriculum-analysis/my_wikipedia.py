import requests
import wikipedia

__WP_API_URL = "https://en.wikipedia.org/w/api.php"


def get_categories(page_title):
    r = requests.get(
        __WP_API_URL,
        params={
            "action": "query",
            "format": "json",
            "titles": page_title,
            "prop": "categories",
            "clshow": "!hidden",  # we don't care for WP meta-categories
        },
    )
    if not r.ok:
        return []
    req_json = r.json()
    return [
        cat["title"]
        for cat in list(req_json["query"]["pages"].values())[0]["categories"]
    ]


def wp_search(*words, results=5):
    return wikipedia.search(" ".join(words), results=results)

