# CSE Curriculum Analysis

Research Thesis 2020 - Terry Agapitos (z5162173)

# Running

### Running everything locally

```shell
$ docker-compose up --build
```

### For development (hotloading)

Make sure ports are exposed in docker-compose.yml (5432:5432, 8000:8000). Then `docker-compose up --build`, then run:

```shell
$ cd client
$ npm install
$ npm run dev # development
```

