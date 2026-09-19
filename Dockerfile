FROM node:26@sha256:cad3d421752df04025739eab1cec176426916faec228ff684211394c5bc8e339

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
