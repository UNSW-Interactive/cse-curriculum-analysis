# put courses_nodupes.json into database
import json
import psycopg2

with open("courses_nodupes.json") as myf:
    j = json.load(myf)

conn = psycopg2.connect(dbname="postgres", user="postgres", host="127.0.0.1", port=5432, password="abc")
cursor = conn.cursor()
print(cursor.execute("SELECT COUNT(*) from courses;"))
for course in j:
    code = course['code']
    name=course['name']
    url =course['url']
    outline = course['outline'].replace('\n', ' ') if 'outline' in course else ''
    res = cursor.execute(f"""INSERT INTO COURSES VALUES (%s, %s, %s, %s);""", (code, name, url, outline))

conn.commit()

cursor.close()
conn.close()