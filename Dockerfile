########################
#      DEVELOPMENT     #
########################


FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install

COPY --chown=node:node . .

USER node

CMD ["yarn", "dev"]

