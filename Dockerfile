FROM node:6@sha256:9b239b645d2afacec35ada5ec2affd570e8acec2abdcfd1d0fe640329b22093e

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
