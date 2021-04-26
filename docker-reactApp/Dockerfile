# dockerfile
# stage 1
FROM node:12-alpine as build
WORKDIR /app

COPY . /app

RUN yarn
RUN yarn run build

# # stage 2
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]