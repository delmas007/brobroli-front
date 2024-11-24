FROM node:20.15.1-alpine3.20
LABEL maintainer="angamancedrick@gmail.com"

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
