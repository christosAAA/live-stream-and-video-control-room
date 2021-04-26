# dockerfile
FROM node:12-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN yarn install
RUN yarn build

# RUN rm -rf /app/dist/src/uploads
RUN mkdir -p /app/dist/src/uploads
COPY ./dist/src/uploads /app/dist/src/uploads

RUN mkdir -p /app/dist/src/api
COPY ./dist/src/api /app/dist/src/api

EXPOSE 80
CMD [ "node", "dist/src/index.js" ]