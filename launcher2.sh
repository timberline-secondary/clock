#!/bin/sh
# launcher2.sh
# navigate to home directory, then to this directory, then execute python script, then back home

screen -dm bash -c 'cd /home/pi/clock && git pull && npm i && npm run dev'

sleep 5m

export DISPLAY=:0

chromium-browser --start-fullscreen --incognito --app  http://localhost:3000