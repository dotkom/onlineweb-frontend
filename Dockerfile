FROM node:10-alpine

LABEL author=Dotkom
LABEL contact=dotkom@online.ntnu.no

ENV DIR=/srv/www

WORKDIR ${DIR}

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["sh", "-c", "'yarn build:prod && yarn ssr:prod'"]
