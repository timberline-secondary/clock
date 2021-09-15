#!/bin/sh
# launcher2.sh

screen -dm bash -c 'cd /home/pi/clock && git pull && npm i | tee /home/pi/clock/log.txt && npm run dev  | tee /home/pi/clock/log.txt'
export DISPLAY=:0
lxterminal --geometry=1920x1080 -e "screen -r"

launched=false

while [ "$launched" = false ]; do
  if [ -z "$(sudo lsof -nP -iTCP:3000 -sTCP:LISTEN)" ]; then
    echo "Not in use!"
  else
    launched=true

    chromium-browser --start-fullscreen --incognito --app  http://0.0.0.0:3000
  fi
done