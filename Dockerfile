FROM node:26@sha256:85e7e780e68807a13cc96426437edf89e584f8455310b947673671bdadd7ea54

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
