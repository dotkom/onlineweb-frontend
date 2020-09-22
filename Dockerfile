# Stage 1: Building the code
FROM node:14.11.0-alpine AS builder
ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR $WORKDIR

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install --production 


# Stage 2: And then copy over node_modules, etc from that stage to the smaller base image
FROM node:14.11.0-alpine as production
LABEL maintainer="dotkom@online.ntnu.no"

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR $WORKDIR

COPY package.json next.config.js .env* ./
COPY --from=builder $WORKDIR/public ./public
COPY --from=builder $WORKDIR/.next ./.next
COPY --from=builder $WORKDIR/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]