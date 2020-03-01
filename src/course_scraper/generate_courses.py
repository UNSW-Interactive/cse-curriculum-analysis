import requests
from bs4 import BeautifulSoup

CLASSUTIL_URL = "http://classutil.unsw.edu.au/{}_{}.html"
OFFERING_TIMES = ["U1", "T1", "T2", "T3"]
SUBJECT_AREAS = ["COMP", "SENG"]

all_courses = []

for subject_area in SUBJECT_AREAS:
    d = {subject_area: []}
    for offering_time in OFFERING_TIMES:
        url = CLASSUTIL_URL.format(subject_area, offering_time)
        print(url)
        r = requests.get(url)
        soup = BeautifulSoup(r.text, "html.parser")
        courses = soup.find_all("td", {"class": "cucourse", "colspan": "2"})
        for course in courses:
            all_courses.append(
                # todo: can get course title too?
                {
                    "subject_area": subject_area,
                    "offering_time": "T0" if offering_time == "U1" else offering_time,
                    "course_code": course.find("b").get_text(strip=True),
                }
            )

print(all_courses)
