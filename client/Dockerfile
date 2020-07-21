FROM node:8 as builder
WORKDIR /usr/src/app
COPY package*json ./
RUN npm install
COPY src ./src
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY src /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]