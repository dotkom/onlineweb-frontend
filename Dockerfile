FROM node:alpine AS deps
RUN apk add --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-dev fftw-dev gcc g++ make libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN apk add --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]