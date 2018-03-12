#!/usr/bin/env bash

# Start Deploy
echo -e "Start deploy...\n"
npm run assets:prod &

echo -e "Build public folder...\n"
rm -rf public/ && mkdir public/

# Assets
cp -R css public/
cp -R dist public/

# Data
cp -R data public/

# Images
cp -R img public/
cp -R svg public/

# View
cp index.html public/
cp restaurant.html public/
cp 404.html public/

echo "Deploy on firebase..."
firebase deploy