#!/bin/bash
set -e

while :
do
git pull
npm install
rm -rf build
tsc -p tsconfig.server.json
tsc --noEmit -p tsconfig.client.json
./node_modules/.bin/esbuild client/tinywars.ts --bundle --minify --sourcemap --outfile=public/tinywars.js
NODE_DEV=production node build/server.js
done