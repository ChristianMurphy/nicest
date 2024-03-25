FROM node:21@sha256:ca75f977b1c9e9a2cc5480efe5b7df07ce38373316e30b91eeadddb6a025b8a8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
