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

Change URL in index.js

```shell
$ cd client
$ npm install
$ npm run dev # development
```

