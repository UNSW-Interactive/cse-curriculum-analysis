import psycopg2

# docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
# conn = psycopg2.connect(dbname="postgres", user="postgres", host="127.0.0.1", password="mysecretpassword")

# cursor = conn.cursor()
# cursor.execute('''CREATE TABLE mytable(
#     id int
# );''')

# cursor.execute('''insert into mytable values (4);''')
# cursor.execute('''select * from mytable;''')
# for i, record in enumerate(cursor):
#     print ("\n", type(record))
#     print ( record )
# cursor.close()
# conn.close()

# docker run -p 3001:3001 axarev/

import requests
import json

url='http://localhost:3001'
files = {
    'file': ('curriculum-analysis/file-management.pdf', open('curriculum-analysis/file-management.pdf', 'rb'), 'application/pdf'),
}

r = requests.post(f'{url}/api/v1/document', files=files)
file_id = r.text

r2 = requests.get(f'{url}/api/v1/queue/{file_id}')
json_url = r2.json()['json']

r3 = requests.get(f'{url}{json_url}')