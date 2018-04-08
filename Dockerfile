FROM node:boron

WORKDIR /www/app
COPY package.json .
RUN npm install
COPY . .
RUN npm install
RUN npm install pm2 -g

CMD ["pm2-docker", "index.js"]