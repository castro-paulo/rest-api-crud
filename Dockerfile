FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install


# Bundle app source
COPY . /app

CMD node server.js

EXPOSE 8080