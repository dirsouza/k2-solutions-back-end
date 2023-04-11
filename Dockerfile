FROM node:18-alpine

RUN npm i -g @nestjs/cli

WORKDIR /user/src/app

COPY . .

RUN npm ci --omit=dev

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]