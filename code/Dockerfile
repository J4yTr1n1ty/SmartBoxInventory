FROM node:22.7.0-alpine3.19 AS build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.27.1-alpine3.20

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/easy-move/browser /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g daemon off;"]
