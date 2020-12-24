#FROM node:12.2.0-alpine
FROM registry.cn-beijing.aliyuncs.com/lxnamespace/node:alpine

RUN mkdir -p /usr/src/{{name}}

WORKDIR /usr/src/{{name}}

COPY . /usr/src/{{name}}

EXPOSE 80

CMD yarn start