# CSE Curriculum Analysis

Research Thesis 2020 - Terry Agapitos (z5162173)

# Running

### Running everything locally

```shell
$ docker-compose up --build
```

Then navigate to http://localhost:80

### For development (hotloading)

#### db

`docker-compose -f docker-compose-local.yml up --build` to boot up the database.

#### server

```shell
$ cd server
$ pipenv shell
$ cd api
$ flask run
```

#### front end

Change URL in api.js

```shell
$ cd client
$ npm install
$ npm run dev # development
```

### For deployment

Get `dump.pgdata` and put it in the `server/database` directory. Also, get `.env.prod` and put it in the root directory.

Then from the root directory, run:

```shell
$ docker-compose up --build
# Then, in another terminal shell, run the following command.
# this command will populate the database.
$ docker exec cse-curriculum-analysis_db_1 sh -c "pg_restore -C -d postgres dump.pgdata"
```

This only needs to be done once
