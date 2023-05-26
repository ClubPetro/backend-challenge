FROM node:16-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "run" ]
CMD ["dev"]