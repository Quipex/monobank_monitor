FROM node:18-alpine3.16

WORKDIR /app

COPY node_modules /app/node_modules
COPY commit_meta /app/commit_meta
COPY dist /app/dist

CMD ["node", "/app/dist/index.js"]
