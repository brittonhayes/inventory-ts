FROM node:18-alpine AS builder

LABEL org.opencontainers.image.source https://github.com/brittonhayes/inventory-ts

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.18-alpine AS runner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]