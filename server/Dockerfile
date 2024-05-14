FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

EXPOSE 5001

CMD [ "npm","run","start:dev" ]