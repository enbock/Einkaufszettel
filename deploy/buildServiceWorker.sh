#!/usr/bin/env bash

rm build/ServiceWorkerManager.js 2>/dev/null || true

npm run build:service-worker

cd ./build

files="$(find . -type f | grep -v ServiceWorkerManager.js | sed 's:^:":' | sed 's:$:":' | tr "\n" "," | sed "s:,$::")"
version="$(date +"%s")"

echo "Update ServiceWorkerManager..."

mv ServiceWorkerManager.js ServiceWorkerManager.js.tmp
echo "const version = '$version';" >ServiceWorkerManager.js
echo "const fileList = [$files];" >>ServiceWorkerManager.js

cat ServiceWorkerManager.js.tmp |
  grep -v 'const version' |
  grep -v 'const fileList' |
  sed 's:^export ::' \
    >>ServiceWorkerManager.js

rm ServiceWorkerManager.js.tmp
