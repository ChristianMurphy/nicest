FROM node:26@sha256:35823c03e725dca8d8cf2483ec17977a430f2ce0f6f68583913d052e99f913a0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm link .
EXPOSE 8080
CMD nicest dev
