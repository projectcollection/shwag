FROM node AS build-stage

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:alpine AS deploy-stage

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/dist/ .

ENTRYPOINT ["nginx", "-g", "daemon off;"]


