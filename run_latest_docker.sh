#!/bin/bash

# Specify the file path
file_path="./.env"

# Extract the first line of the file
first_line=$(head -n 1 "$file_path")

# Create a temporary file to store the first line
tmp_file=$(mktemp)
echo "$first_line" > "$tmp_file"

# Source the temporary file
source "$tmp_file"

# Clean up the temporary file
rm "$tmp_file"

docker run --name monobot -dp $APP_PORT:$APP_PORT --env-file ./.env quipex/monobot:latest
