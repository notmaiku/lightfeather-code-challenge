# base image
FROM node:18.15.0-alpine

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy app files
COPY . ./

# build Angular app
RUN npm run build --prod

# start Angular app
CMD ["npm", "start"]
