# CSE Curriculum Analysis

Research Thesis 2020 - Terry Agapitos (z5162173)

# Running

## Server

```shell
$ cd server
$ pipenv shell
$ cd api
$ python3 manage.py run
```

```shell
$ cd server
$ pipenv shell
$ cd api
$ gunicorn -b 0.0.0.0:8000 manage:app
```

## Client

```shell
$ cd client
$ npm install
$ npm run dev # development
```

## Running everything locally

```shell
$ docker-compose up --build
```