FROM node:22 

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV POSTGRES_USER: postgres
ENV POSTGRES_PASSWORD: Azizaetl8.
ENV POSTGRES_DB: twitter

RUN npx typeorm-ts-node-commonjs migration:generate -d .\src\database\data-source.ts ./src/migrations/init
RUN npx typeorm-ts-node-commonjs migration:run -d .\src\database\data-source.ts
CMD ["npm", "run", "dev"]