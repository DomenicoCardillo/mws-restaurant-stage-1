#!/usr/bin/env bash

echo "Build into public folder..."
rm -rf public/ && mkdir public/

# Start Deploy
echo "Start deploy..."
npm run assets:prod
npm run assets:css

# Assets
cp -R dist public/

# Data (not necessary anymore)
# cp -R data public/

# Images
cp -R img public/
cp -R svg public/
cp -R icons public/

# View
cp index.html public/
cp restaurant.html public/
cp 404.html public/

# Config (Production)
cp config-prod.js public/config.js

# Other dirs
cp -R sw-lib public/

# Other files
cp sw.js public/
cp manifest.webmanifest public/

echo "Deploy on firebase..."
firebase deploy