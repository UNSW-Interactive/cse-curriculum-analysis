set -xeu
currdate=`date +%d-%m-%Y"_"%H_%M_%S`
filename="dump_$currdate.sql"
docker exec -t cse-curriculum-analysis_db_1 pg_dumpall -c -U postgres > "$filename"
