FROM node:26@sha256:edf8c5ace79040421c2f00a4af06deeb7a1e2c5ffe33b6af7ca31964a092ca8b

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
