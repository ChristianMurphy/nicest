FROM node:26@sha256:729cbbdccbbac8f9354c9ddaed8cfa6fe5ec893dca12ea52e9c13b4b76f7282b

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
