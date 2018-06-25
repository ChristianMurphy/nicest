FROM node:6@sha256:72e3854d241d22e0bd35fd64e1ec1a8fddf79ca947dc44ce63e7ce1a29115e55

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
