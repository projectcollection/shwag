FROM node AS build-stage

WORKDIR /app

COPY . .

RUN npm install && npm run build
RUN npm install -g serve

RUN cp serve.json ./dist/serve.json

ENTRYPOINT ["serve", "-p", "80", "./dist/"]

#FROM nginx:alpine AS deploy-stage
#
#WORKDIR /usr/share/nginx/html
#
#RUN rm -rf ./*
#
#COPY --from=build-stage /app/dist/ .
#COPY --from=build-stage /app/nginx.conf .

#ENTRYPOINT ["nginx", "-g", "daemon off;"]


