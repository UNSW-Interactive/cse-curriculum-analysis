# parses classutil for all courses

import requests
import json
from bs4 import BeautifulSoup

CLASSUTIL_URL = "https://nss.cse.unsw.edu.au/sitar/classes2019/{}_{}.html"
OFFERING_TIMES = ["U1", "T1", "T2", "T3"]
SUBJECT_AREAS = ["COMP", "SENG"]

all_courses = []

for subject_area in SUBJECT_AREAS:
    d = {subject_area: []}
    for offering_time in OFFERING_TIMES:
        url = CLASSUTIL_URL.format(subject_area, offering_time)
        r = requests.get(url)
        soup = BeautifulSoup(r.text, "html.parser")
        courses = soup.find_all("td", {"class": "cucourse", "colspan": "2"})
        for course in courses:
            offering_time = "T0" if offering_time == "U1" else offering_time
            course_code = course.find("b").get_text(strip=True)
            course_name = course.parent.find_all("td")[1].get_text(strip=True)
            all_courses.append(
                {
                    "offering_time": offering_time,
                    "code": course_code,
                    "name": course_name,
                }
            )

with open("src/course_scraper/courses.json", "w") as course_file:
    json.dump(all_courses, course_file)
