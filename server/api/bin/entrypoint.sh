#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

pipenv run gunicorn -b 0.0.0.0:8001 manage:app
# gunicorn -b 0.0.0.0:8000 manage:app

exec "$@"