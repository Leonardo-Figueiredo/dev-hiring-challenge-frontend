############### Development ###############
FROM node:16.15.1-alpine as development

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json /usr/app
COPY yarn.lock /usr/app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN yarn install

COPY . /usr/app

ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "yarn", "dev" ]

############### Production ###############
FROM node:16.15.1-alpine as production

RUN rm -rf .next
RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json /usr/app
COPY yarn.lock /usr/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn install

COPY . /usr/app

RUN yarn build

COPY .next /usr/app/

ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "yarn", "start" ]
