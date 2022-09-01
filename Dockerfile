# Multistage DEV
FROM node:16.3.0-alpine as dev

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

USER node

# Multistage PROD
FROM node:16.3.0-alpine as prod

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production

COPY --chown=node:node --from=dev /app/dist ./dist
COPY --chown=node:node ./tsconfig* ./

USER node

CMD [ "npm", "run", "start:prod" ]
