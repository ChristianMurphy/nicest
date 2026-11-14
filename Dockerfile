FROM node:26@sha256:da81f6af5dac20131c6040b26bdc5c3784b85eeeac59e4ea06ee38f718e7df7b

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
