# put courses_nodupes.json into database
import json
import psycopg2

COURSE_FILE = "course_scraper/prereqs3.json"
with open(COURSE_FILE) as myf:
    j = json.load(myf)

conn = psycopg2.connect(dbname="postgres", user="postgres", host="127.0.0.1", port=5432, password="abc")
cursor = conn.cursor()

for course in j.keys():
    print(course)
    query = """UPDATE courses set handbook_prereqs=%s where course_code = %s""" 
    # grad_lvl = j[course]['grad_level']
    handbook = j[course]['handbook_prereqs']
    # prereqs = json.dumps(j[course]['prereqs'])
    cursor.execute(query, (handbook, course))

conn.commit()

cursor.close()
conn.close()