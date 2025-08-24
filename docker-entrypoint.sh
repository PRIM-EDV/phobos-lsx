#!/bin/sh

# Generate web environment
envsubst < /opt/phobos-lsx/apps/backend/public/js/env.template.js > /opt/phobos-lsx/apps/backend/public/js/env.js

# Start the app
cd "/opt/phobos-lsx/apps/backend" && npm run start
