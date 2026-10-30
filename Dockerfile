FROM node:26@sha256:6c6f2679f5b655c7c6091a34b81372b5962ca9f25d897a501d613742f922567b

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
