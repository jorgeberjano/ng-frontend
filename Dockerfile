# Primera etapa
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Segunda Etapa
FROM nginx:1.17.1-alpine

# Cambiar 'app-front' por el nombre de la aplicación
COPY --from=build-step /app/dist/app-front /usr/share/nginx/html