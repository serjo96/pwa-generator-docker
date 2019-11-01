FROM node:12.6 AS build
WORKDIR /backend

COPY package.json .
RUN npm install -g yarn
RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "yarn" ]
CMD ["run", "start"]
