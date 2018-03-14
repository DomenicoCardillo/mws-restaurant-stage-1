#!/usr/bin/env bash

# Init
cp _config.js config.js

echo "Edit config.js file before continue!"
read -n 1 -p "Press a key to continue..."

npm install && npm run assets:img && npm run assets:dev