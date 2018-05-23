FROM node:6@sha256:3345a962ab93dd1fb7591e1842a0dc9322e69a5560be1b6d97b293804d434cc3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
