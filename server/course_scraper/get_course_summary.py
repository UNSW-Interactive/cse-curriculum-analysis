# from handbook
import json
import requests
from bs4 import BeautifulSoup

# with open('course_scraper/courses_nodupes.json') as myf:
#     j = json.load(myf)
#     aa = {}
#     for cc in j:
#         aa[cc['code']] = ''


def scrape_handbook():
    res={}
    handbook_url = 'https://www.handbook.unsw.edu.au/{}/courses/2020/{}/' # undergraduate, code
    for course in j:
        course_name = course['code']
        for grad_level in ('undergraduate', 'postgraduate'):
            url = handbook_url.format(grad_level, course_name.lower())
            r = requests.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            error_page = soup.find('div', {'class':'error-page'})
            if error_page is not None:
                continue
            
            print("-----")
            print(course_name)
            summary = soup.find('div', {'id':'subject-intro'}).find('div', {'class':'readmore__wrapper'})
            if summary is not None:
                res[course_name] = summary.text

            
    return res


def a():
    with open('handbook_summaries.json', 'w') as myf:
        json.dump(scrape_handbook(), myf)

import psycopg2
def put_in_db():
    with open('handbook_summaries.json') as myf:
        j = json.load(myf)
    
    conn = psycopg2.connect(dbname="postgres", user="postgres", host="127.0.0.1", port=5432, password="abc")
    cursor = conn.cursor()

    for course in j.keys():
        print(course)
        query = """UPDATE courses set handbook_summary = %s where course_code = %s""" 
        handbook_summary = j[course].strip()
        cursor.execute(query, (handbook_summary, course))

        conn.commit()

    cursor.close()
    conn.close()
    
put_in_db()