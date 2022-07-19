FROM node:14 as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN yarn && yarn build

# 2 - Production environment
FROM node:14

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package.json /home/node/
COPY --from=builder /home/node/yarn.lock /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["yarn", "start:prod"]