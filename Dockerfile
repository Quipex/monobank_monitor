FROM oraclelinux:7-slim

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 oracle-instantclient-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient-basic nodejs && \
     rm -rf /var/cache/yum

WORKDIR /app

COPY node_modules /app/node_modules
COPY dist /app/dist

CMD ["node", "/app/dist/index.js"]
