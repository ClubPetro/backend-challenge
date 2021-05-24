FROM node:14

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3334

CMD ["npm", "run", "dev"]