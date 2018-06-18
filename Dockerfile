FROM node:6@sha256:6ed17656f6b15e5d97c2a7a6b73b76a237dffb6e0c0ccc78b52f98c5083889e3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
