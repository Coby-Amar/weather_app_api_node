FROM node:24-slim AS dev 

WORKDIR /app

COPY ./package*.json .

RUN npm i

CMD [ "npm", "run", "dev" ]

# docker build ./ -t cobyamar/weather_app_api_node:1.0.0 && docker push cobyamar/weather_app_api_node:1.0.0
FROM node:24-slim AS builder 

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:24-slim AS prod 

WORKDIR /app

COPY --from=builder /app/dist /app

EXPOSE 80
CMD ["node", "app.js"]


