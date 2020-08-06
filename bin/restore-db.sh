# should take a few seconds
# freezing? quit the API...
set -xeu
latest_backup=$(ls db-dumps/ | tail -n 1)
gunzip -k "db-dumps/$latest_backup" | docker exec -t cse-curriculum-analysis_db_1 psql -U postgres


# will fail if first time since the container doesn't exist...
# ideally, this restore is part of the docker-compose


# docker exec -i cse-curriculum-analysis_db_1 psql -U postgres < db-dumps/dump_20200805-20_53_59

# try
# gunzip -k "db-dumps/$latest_backup" | docker exec -i cse-curriculum-analysis_db_1 psql -U postgres