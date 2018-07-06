#!/usr/bin/env bash

# Init
ln -s config-loc.js config.js

echo "Edit config.js file with your local url before continue!"
read -n 1 -p "Press a key to continue..."

npm install && npm run assets:img && npm run assets:dev