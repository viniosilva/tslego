FROM node:12.18-alpine AS builder

WORKDIR /usr/src/app

FROM builder AS production
COPY package*.json ./
RUN npm install --production
COPY dist/ src/
CMD [ "npm", "run", "start" ]

FROM builder AS development
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]
