# Running locally latest prod image

`docker-compose up -d`

# Developing

## Building docker image locally

`docker build -t monobot_local .`

## Running local image

`docker run --name monobot_local -dp 3030:3030 --env-file ./.env monobot_local`
