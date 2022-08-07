FROM node:lts-alpine AS development

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

ENV USE_DEFAULT_SERVICE_ACCOUNT true

ENV PORT=8080

EXPOSE ${PORT}

CMD npm run start
