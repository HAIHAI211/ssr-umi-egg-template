FROM node:12.2.0-alpine

RUN mkdir -p /usr/src/lx-gw

WORKDIR /usr/src/lx-gw

COPY . /usr/src/lx-gw

EXPOSE 80

CMD yarn teststart