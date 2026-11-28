FROM node:26@sha256:bcaafe01655722314a2e8b2233b0de90bc33c8de0c9ce7a239a63a9d47fc4527

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
