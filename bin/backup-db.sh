# should take a few seconds
# freezing? quit the API...
set -xeu
currdate=`date +%Y%m%d"-"%H_%M_%S`
filename="db-dumps/dump_$currdate.gz"
touch "$filename"
docker exec -t cse-curriculum-analysis_db_1 pg_dumpall -c -U postgres | gzip > "$filename"
