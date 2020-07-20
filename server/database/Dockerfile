# docker build --tag=postgres-db .
# docker run -e POSTGRES_PASSWORD=abc postgres-db ### TODO: Should use -d to run in background?
FROM postgres:latest
COPY *.sql /docker-entrypoint-initdb.d/
# docker-compose up --build
#docker exec -t 29ae72100ab4 pg_dumpall -c -U postgres > dump.sql
## maybe don't need... but maybe would need if want to run locally someone else

# docker exec -it 312bec8036f6 bash
# psql -U postgres
