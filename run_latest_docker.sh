source .env
docker run --name monobot -dp $APP_PORT:$APP_PORT --env-file ./.env quipex/monobot:latest
