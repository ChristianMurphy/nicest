FROM node:26@sha256:cf390ba2f2ba9516bfdcb98cfd16718c8a500b6b41363a30dade0f2a1d57d384

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
