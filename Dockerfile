# Primera etapa
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build ges-crud

RUN npm run build --prod

# Segunda Etapa
FROM nginx:1.17.1-alpine as app-front-nginx

# Cambiar 'app-front' por el nombre de la aplicación
COPY --from=build-step /app/dist/app-front /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

