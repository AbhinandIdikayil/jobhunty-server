FROM node:alpine

WORKDIR /notification

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 6000

CMD [ "npm","run","dev" ]