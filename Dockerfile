FROM node:14.15.5-alpine

EXPOSE ${PORT}

WORKDIR /usr/server
COPY package.json .

RUN npm install
COPY . .
RUN npm build
ENTRYPOINT [ "npm", "server:prod" ]
