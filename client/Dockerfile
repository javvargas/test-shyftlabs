FROM node:18-alpine3.18

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY . /app

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]
