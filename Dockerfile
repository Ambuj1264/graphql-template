FROM node:bullseye

RUN apt-get update && apt-get install -y gnupg dirmngr wget && apt-get install -y libpq-dev postgresql-client
WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4719

CMD ["npm", "start"]
