#!/usr/bin/env bash
export PORT=3006
cp .env src/fe/.env # we want to maintain just one env file, but react-scripts requires it to be in the src folder
./node_modules/.bin/react-scripts start