FROM node:22 

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV POSTGRES_USER: postgres
ENV POSTGRES_PASSWORD: Azizaetl8.
ENV POSTGRES_DB: twitter

CMD ["npm", "run", "dev"]