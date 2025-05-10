FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY ./views ./views
COPY index.js ./

RUN npm install 

CMD [ "node","index.js" ]


