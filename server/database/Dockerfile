# docker build --tag=postgres-db .
# docker run -e POSTGRES_PASSWORD=abc postgres-db ### TODO: Should use -d to run in background?
# FROM postgres:latest
# COPY *.sql /docker-entrypoint-initdb.d/
# docker-compose up --build
#docker exec -t 29ae72100ab4 pg_dumpall -c -U postgres > dump.sql
## maybe don't need... but maybe would need if want to run locally someone else

# docker exec -it 312bec8036f6 bash
# psql -U postgres
FROM postgres:latest

WORKDIR /

COPY restore-db.sh ./
COPY /db-dumps/dump_20200816-20_39_45.gz ./

# VOLUME [ "/db-data:/var/lib/postgresql/data" ]
# ENV POSTGRES_PASSWORD=abc

# EXPOSE 5432

ENTRYPOINT [ "./restore-db.sh" ]

# to build:
# docker build -t postgresdb:mypostgresdb .
# docker run -p 5432:5432  postgresdb:mypostgresdb