import requests
from bs4 import BeautifulSoup, NavigableString
import json
import sys
import re
from helpers import get_soup

WEBCMS_URL = "https://webcms3.cse.unsw.edu.au/{}/19{}/outline"
CGICSE_URL = "http://cgi.cse.unsw.edu.au/~{}/"


class CourseHost:
    def __init__(self, base_url):
        self.base_url = base_url

    def get_base_url(self):
        return self.base_url


class Unknown(CourseHost):
    def get_course_outline(self):
        return ""


class CGICSE(CourseHost):
    def __init__(self, base_url):  # todo: change to kwargs, take in url params
        super().__init__(base_url)


class WebCMS(CourseHost):
    def __init__(self, base_url):
        super().__init__(base_url)

    def get_course_outline(self) -> str:
        soup = get_soup(self.base_url)
        course_summary = next(
            (
                x
                for x in soup.find_all("h3")
                if x.get_text(strip=True) == "Course Summary"
            ),
            None,
        )

        outline = ""
        if course_summary is not None:
            # This course uses webcms
            course_summary = course_summary.next_sibling
            while course_summary.name != "h3":
                if not isinstance(course_summary, NavigableString):
                    outline += course_summary.get_text(strip=True)
                course_summary = course_summary.next_sibling
        else:
            # Check for iframe
            external = soup.find_all(text=re.compile("View in browser"))
            if external:
                # print("Found iframe...")
                # print(external[0].parent)
                print("overriding with ", external[0].parent["href"])
                self.base_url = external[0].parent["href"]
                # for now, just record the url, do manual later?
                return ""
                # soup = get_soup(self.base_url)
                # tag = soup.find(text=re.compile("Course Aims"))
                # print(tag)
                # course_summary = tag.next_sibling
                # outline = ""
                # while course_summary.name != "h3":
                #     if not isinstance(course_summary, NavigableString):
                #         outline += course_summary.get_text(strip=True)
                #     course_summary = course_summary.next_sibling
            else:
                return ""

        return outline.strip()

    def __str__(self):
        return "WebCMS"


def is_webcms3(course_code, offering_term):
    url = WEBCMS_URL.format(course_code, offering_term)
    soup = get_soup(url)
    return url if soup.find("h2", string="The page was not found.") is None else ""


def recognise_course_host(course_host_url):
    if course_host_url.startswith("https://webcms3.cse.unsw.edu.au/"):
        return WebCMS(course_host_url)
    elif course_host_url.startswith("http://cgi.cse.unsw.edu.au/"):
        return CGICSE(course_host_url)


with open("src/course_scraper/courses.json") as course_file:
    courses = json.load(course_file)

with open("src/course_scraper/course_host.json") as course_host_file:
    course_hosts = json.load(course_host_file)

courses_result = []
for course in courses:
    course_code = course["code"]
    offering_term = course["offering_time"]
    print(course_code, offering_term)
    if "outline" in course and course["outline"]:
        # not emtpy
        continue

    if course_code in course_hosts:
        url = course_hosts[course_code + offering_term]
        course_platform: CourseHost = recognise_course_host(url)
    else:
        # check webcms only
        if (url := is_webcms3(course_code, offering_term)) :
            course_platform: CourseHost = WebCMS(url)
        else:
            print(
                f"Course {course_code} needs a course outline website added to the repo!"
            )
            continue

    course["outline"] = course_platform.get_course_outline()
    # run this after in case it changes when geting course_outline
    course_hosts[course_code + offering_term] = course_platform.get_base_url()
    courses_result.append(course)

with open("src/course_scraper/courses3.json", "w") as repo:
    json.dump(courses_result, repo, indent=4)

with open("src/course_scraper/course_host.json", "w") as course_host_file:
    json.dump(course_hosts, course_host_file)
