FROM keymetrics/pm2:latest-alpine
RUN apk add --no-cache file
RUN apk --update add imagemagick

FROM node:12.6 AS build
WORKDIR /backend

COPY package.json .
RUN npm install -g yarn
RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "yarn" ]
CMD ["run", "start"]
