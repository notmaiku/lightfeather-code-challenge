FROM node::latest as build

WORKDIR /front

COPY package.json ./

COPY package-lock.json ./

RUN pnpm run install

RUN ng build --configuration=production

COPY . ./

CMD["pnpm", "start"]