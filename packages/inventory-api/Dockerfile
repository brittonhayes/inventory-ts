FROM node:lts-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src src

# Install app dependencies
RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine

LABEL org.opencontainers.image.source https://github.com/brittonhayes/inventory-ts

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 5000

ENTRYPOINT [ "node", "./dist/main.js" ]