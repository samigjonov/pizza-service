FROM node:12

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500
CMD [ "node", "app.js" ]
