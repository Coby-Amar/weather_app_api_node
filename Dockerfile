FROM node:24.6-alpine3.22 AS dev 

WORKDIR /app

COPY ./package*.json .

RUN npm i

CMD [ "npm", "run", "dev" ]

# docker build ./ -t cobyamar/weather_app_api_node:1.0.0 && docker push cobyamar/weather_app_api_node:1.0.0
FROM node:22-alpine AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS prod
WORKDIR /app
COPY --from=builder /app ./
CMD ["node", "dist/app.js"]


