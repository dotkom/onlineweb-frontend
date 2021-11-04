FROM node:lts-alpine AS deps
RUN apk add --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-dev fftw-dev gcc g++ make libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG OW4_HOST
ARG OW4_SCHEME
ARG OW4_SSO_CLIENT_ID
ARG OW4_SSO_CALLBACK
ARG OWF_SENTRY_DSN
ARG OWF_GOOGLE_ANALYTICS_KEY
ARG OWF_VAPID_SERVER_KEY
ARG STRIPE_PUBLIC_KEY_ARRKOM
ARG STRIPE_PUBLIC_KEY_FAGKOM
ARG STRIPE_PUBLIC_KEY_PROKOM
ARG STRIPE_PUBLIC_KEY_TRIKOM
ARG RECAPTCHA_PUBLIC_KEY
ENV OW4_HOST=$OW4_HOST
ENV OW4_SCHEME=$OW4_SCHEME
ENV OW4_SSO_CLIENT_ID=$OW4_SSO_CLIENT_ID
ENV OW4_SSO_CALLBACK=$OW4_SSO_CALLBACK
ENV OWF_SENTRY_DSN=$OWF_SENTRY_DSN
ENV OWF_GOOGLE_ANALYTICS_KEY=$OWF_GOOGLE_ANALYTICS_KEY
ENV OWF_VAPID_SERVER_KEY=$OWF_VAPID_SERVER_KEY
ENV STRIPE_PUBLIC_KEY_ARRKOM=$STRIPE_PUBLIC_KEY_ARRKOM
ENV STRIPE_PUBLIC_KEY_FAGKOM=$STRIPE_PUBLIC_KEY_FAGKOM
ENV STRIPE_PUBLIC_KEY_PROKOM=$STRIPE_PUBLIC_KEY_PROKOM
ENV STRIPE_PUBLIC_KEY_TRIKOM=$STRIPE_PUBLIC_KEY_TRIKOM
ENV RECAPTCHA_PUBLIC_KEY=$RECAPTCHA_PUBLIC_KEY
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

FROM node:lts-alpine AS runner
WORKDIR /app

RUN apk add --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing vips \
  && addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ARG OW4_HOST
ARG OW4_SCHEME
ARG OW4_SSO_CLIENT_ID
ARG OW4_SSO_CALLBACK
ARG OWF_SENTRY_DSN
ARG OWF_GOOGLE_ANALYTICS_KEY
ARG OWF_VAPID_SERVER_KEY
ARG STRIPE_PUBLIC_KEY_ARRKOM
ARG STRIPE_PUBLIC_KEY_FAGKOM
ARG STRIPE_PUBLIC_KEY_PROKOM
ARG STRIPE_PUBLIC_KEY_TRIKOM
ARG RECAPTCHA_PUBLIC_KEY
ENV OW4_HOST=$OW4_HOST
ENV OW4_SCHEME=$OW4_SCHEME
ENV OW4_SSO_CLIENT_ID=$OW4_SSO_CLIENT_ID
ENV OW4_SSO_CALLBACK=$OW4_SSO_CALLBACK
ENV OWF_SENTRY_DSN=$OWF_SENTRY_DSN
ENV OWF_GOOGLE_ANALYTICS_KEY=$OWF_GOOGLE_ANALYTICS_KEY
ENV OWF_VAPID_SERVER_KEY=$OWF_VAPID_SERVER_KEY
ENV STRIPE_PUBLIC_KEY_ARRKOM=$STRIPE_PUBLIC_KEY_ARRKOM
ENV STRIPE_PUBLIC_KEY_FAGKOM=$STRIPE_PUBLIC_KEY_FAGKOM
ENV STRIPE_PUBLIC_KEY_PROKOM=$STRIPE_PUBLIC_KEY_PROKOM
ENV STRIPE_PUBLIC_KEY_TRIKOM=$STRIPE_PUBLIC_KEY_TRIKOM
ENV RECAPTCHA_PUBLIC_KEY=$RECAPTCHA_PUBLIC_KEY
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]