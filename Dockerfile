FROM node:6@sha256:85a878cb14deb5a5a59944e906d43ef400e182e9fcc81a6beb18907f52309261

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
