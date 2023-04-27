FROM node:alpine

WORKDIR /usr/app

COPY package*.json pm2.json ./

RUN npm i
RUN npm i -g pm2
RUN npm i -g @nestjs/cli
RUN pm2 install typescript
RUN pm2 install pm2-server-monit

COPY . . 

EXPOSE ${APP_PORT}

CMD [ "pm2-runtime", "start", "pm2.json"]