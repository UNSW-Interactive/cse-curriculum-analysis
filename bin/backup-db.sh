# should take a few seconds
# freezing? quit the API...
set -xeu
currdate=`date +%Y%m%d"-"%H_%M_%S`
# filename="db-dumps/dump_$currdate.gz"
filename="db-dumps/dump.pgdata"
# touch "$filename"
# docker exec -t cse-curriculum-analysis_db_1 pg_dumpall -c -U postgres | gzip > "$filename"
docker exec -t cse-curriculum-analysis_db_1 mkdir -p "db-dumps"
docker exec -t cse-curriculum-analysis_db_1 touch "$filename"
docker exec -t cse-curriculum-analysis_db_1 pg_dump -U postgres --format custom --file "$filename" "cse-curriculum-analysis"
docker cp cse-curriculum-analysis_db_1:db-dumps/dump.pgdata ./db-dumps/dump.pgdata
