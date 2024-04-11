#!/usr/bin/env bash
cd src/be
cp ../../.env .
NODE_OPTIONS="--import=../be/register.mjs" node app.ts

