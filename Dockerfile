FROM node:26@sha256:7c99901bfcd76ef5bf55251bdfa2be541400ba964321d9075fd55aba55fb3eba

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
