import psycopg2

# docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
conn = psycopg2.connect(dbname="postgres", user="postgres", host="127.0.0.1", password="mysecretpassword")

cursor = conn.cursor()
cursor.execute('''CREATE TABLE mytable(
    id int
);''')

cursor.execute('''insert into mytable values (4);''')
cursor.execute('''select * from mytable;''')
for i, record in enumerate(cursor):
    print ("\n", type(record))
    print ( record )
cursor.close()
conn.close()