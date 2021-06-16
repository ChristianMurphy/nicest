FROM node:16@sha256:e36cf1bb8719551220ba8c3ee1583881e79ad040803570e0849b00b8fe009153

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
