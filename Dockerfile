FROM node:12.16.3-alpine

WORKDIR /home/node/app
ADD . .

ENV NODE_ENV=development

RUN npm i

USER node