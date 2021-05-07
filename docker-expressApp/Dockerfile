# dockerfile
FROM node:12-alpine
WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

EXPOSE 80
CMD [ "node", "dist/src/index.js" ]