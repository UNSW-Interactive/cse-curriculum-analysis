FROM node:8 as builder
WORKDIR /usr/src/app
COPY package*json ./
RUN npm install
COPY src ./src

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY src /usr/share/nginx/html