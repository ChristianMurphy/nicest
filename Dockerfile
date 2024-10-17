FROM node:23@sha256:e643c0b70dca9704dff42e12b17f5b719dbe4f95e6392fc2dfa0c5f02ea8044d

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
