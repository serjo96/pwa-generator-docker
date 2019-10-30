FROM node:12.6 AS build
WORKDIR /front-end
COPY package.json .
RUN npm install -g yarn
RUN yarn install
COPY . .
EXPOSE 8080

ENTRYPOINT [ "yarn" ]
CMD ["run", "serve"]
