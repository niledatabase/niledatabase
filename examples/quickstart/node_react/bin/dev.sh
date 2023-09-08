#!/usr/bin/env bash

# Start both react + node apps concurrently
./node_modules/.bin/concurrently \
  --names "www,api" \
  --handle-input true \
  --default-input-target 1 \
  --kill-others \
  --prefix-colors "bgBlue.bold,bgOrange.bold" \
  "bash ./bin/dev_fe.sh" \
  "bash ./bin/dev_be.sh"
