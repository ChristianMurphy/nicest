FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/apps
EXPOSE 8080
CMD [ "npm", "start" ]
