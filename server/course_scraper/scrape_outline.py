import json
from helpers import get_soup
from bs4 import NavigableString
import sys

with open("src/course_scraper/courses_nodupes.json") as courses_file:
    courses = json.load(courses_file)

# if len(sys.argv) > 1:
#     courses = [c for c in courses if c["code"] == sys.argv[1]]
# with open("src/course_scraper/course_host.json") as course_host_file:
#     course_hosts = json.load(course_host_file)
keywords = ["course objectives", "course summary", "course aims", "aims"]
headers = ["h1", "h2", "h3"]
for course in courses:
    if (
        ("outline" in course and course["outline"])
        or not course["url"]
        or "private" in course
    ):
        continue

    course_code = course["code"]
    url = course["url"]
    soup = get_soup(url)
    # print(soup.find_all(["h1", "h2", "h3"])[3].get_text(strip=True).lower() in keywords)
    course_summary = next(
        (
            x
            for x in soup.find_all(headers)
            if x.get_text(strip=True).lower() in keywords
        ),
        None,
    )
    print(course_summary)
    outline = ""
    if course_summary is not None:
        orig = course_summary.name
        course_summary = course_summary.next_sibling
        while course_summary is not None and (
            course_summary.name not in headers
            or not course_summary.get_text(strip=True)
        ):
            if not isinstance(course_summary, NavigableString):
                outline += course_summary.get_text(strip=True)
            course_summary = course_summary.next_sibling

    print(course_code, url)
    print(outline.strip())
    course["outline"] = outline.strip()

with open("src/course_scraper/courses_nodupes.json", "w") as courses_file:
    json.dump(courses, courses_file)
