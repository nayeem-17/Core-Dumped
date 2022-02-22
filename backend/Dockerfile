FROM node:14.17.0
WORKDIR /usr/node/app

# instantclient_21_3
# USER root
# RUN chmod 777 /usr/node

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g typescript

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start

