import psycopg2

# docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
conn = psycopg2.connect(
    dbname="postgres", user="postgres", host="127.0.0.1", port=5432, password="abc"
)

def get_all_courses_lectures_categories():
    res = []
    query = """select course_code, lecture_num, categories from lectures;"""
    cursor = conn.cursor()
    cursor.execute(query)
    for record in cursor:
        res.append(record) # (course_code, lecture_num, categories)
    return res

def get_prereqs(courses):
    res = {}
    query = """select course_code, handbook_prereqs, prereqs from courses where course_code = ANY(%s);"""
    cursor = conn.cursor()
    cursor.execute(query, (courses,))
    for record in cursor: #ideally, put into some model
        res[record[0]] = {
            'handbook_prereqs': record[1],
            'prereqs': record[2]
        }
    return res

def get_all_prereqs():
    res = {}
    query = """select course_code, handbook_prereqs, prereqs from courses"""
    cursor = conn.cursor()
    cursor.execute(query)
    for record in cursor: #ideally, put into some model
        res[record[0]] = {
            'handbook_prereqs': record[1],
            'prereqs': record[2]
        }
    return res