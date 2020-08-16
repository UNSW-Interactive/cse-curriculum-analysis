
echo "Restoring the database from the latest version"
gunzip -k dump_20200816-20_39_45.gz | psql -U postgres