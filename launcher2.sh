#!/bin/sh
# launcher2.sh
# navigate to home directory, then to this directory, then execute python script, then back home

screen -dm bash -c 'cd /home/pi/clock && git pull && yarn && yarn dev'
launched=false

while [ "$launched" = false ]; do
  if [ -z "$(sudo lsof -nP -iTCP:3000 -sTCP:LISTEN)" ]; then
    echo "Not in use!"
  else
    launched=true

    export DISPLAY=:0

    chromium-browser --start-fullscreen --incognito --app  http://localhost:3000
  fi
done