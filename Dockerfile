FROM node:26@sha256:3779eb08da9114e6957b0c42a84a9471167c47e0d5fdb73ea8e8559a26789556

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
