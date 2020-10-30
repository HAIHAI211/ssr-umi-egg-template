#FROM nginx:alpine
FROM registry.cn-beijing.aliyuncs.com/lxnamespace/nginx:alpine
WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html/
COPY MP_verify_5kn1IO24GOBZxy9u.txt /usr/share/nginx/html/
COPY MP_verify_Iw2tx3AIwvMBUhYn.txt /usr/share/nginx/html/
COPY MP_verify_0kqV7SASD9PfmTrZ.txt /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]