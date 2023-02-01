FROM node:alpine3.16

WORKDIR /app

COPY package* ./

RUN npm install --production

COPY . .

CMD [ "npm", "run", "prod"]