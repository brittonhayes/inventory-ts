FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .svelte-kit ./.svelte-kit
COPY src src

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine

LABEL org.opencontainers.image.source https://github.com/brittonhayes/inventory-ts

WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /usr/src/app/ .

EXPOSE 3000

CMD ["node", "./build/index.js"]