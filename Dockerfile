# Stage 1: Building the code
FROM node:14.11.0-alpine AS builder
ENV WORKDIR=/srv/app

ARG OWF_SENTRY_DSN
ARG OW4_SSO_CLIENT_ID
ARG OW4_SSO_CALLBACK
ARG OWF_GOOGLE_ANALYTICS_KEY
ARG OWF_BACKEND_PORT
ARG OWF_VAPID_PUBLIC_KEY
ARG OWF_WEBPUSH_SERVER_URL
ARG STRIPE_PUBLIC_KEY_ARRKOM
ARG STRIPE_PUBLIC_KEY_FAGKOM
ARG STRIPE_PUBLIC_KEY_PROKOM
ARG STRIPE_PUBLIC_KEY_TRIKOM
ARG RECAPTCHA_PUBLIC_KEY
ARG OWF_VAPID_SERVER_KEY

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR $WORKDIR

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build
RUN npm install --production 


# Stage 2: And then copy over node_modules, etc from that stage to the smaller base image
FROM node:14.11.0-alpine as production
LABEL maintainer="dotkom@online.ntnu.no"

ENV WORKDIR=/srv/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR $WORKDIR

COPY package.json next.config.js .env* ./
COPY --from=builder $WORKDIR/public ./public
COPY --from=builder $WORKDIR/.next ./.next
COPY --from=builder $WORKDIR/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]