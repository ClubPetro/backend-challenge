FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn","start"]