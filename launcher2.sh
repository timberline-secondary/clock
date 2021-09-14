#!/bin/sh
# launcher2.sh

screen -dm bash -c 'cd /home/pi/clock && git pull && npm i | tee /home/pi/clock/log.txt && npm run dev  | tee /home/pi/clock/log.txt'
launched=false

while [ "$launched" = false ]; do
  if [ -z "$(sudo lsof -nP -iTCP:3000 -sTCP:LISTEN)" ]; then
    echo "Not in use!"
  else
    launched=true

    export DISPLAY=:0

    chromium-browser --start-fullscreen --incognito --app  http://0.0.0.0:3000
  fi
done