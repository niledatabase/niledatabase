#!/usr/bin/env bash
cd src/be
cp ../../.env .
node --loader ts-node/esm app.ts
