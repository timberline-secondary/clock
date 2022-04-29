#!/bin/sh
# launcher2.sh

screen -dm bash -c 'cd /home/pi/clock && git pull && npm i | tee /home/pi/clock/log.txt && npm run dev  | tee /home/pi/clock/log.txt'


launched=false

export DISPLAY=:0

while [ "$launched" = false ]; do
  if [ -z "$(sudo lsof -nP -iTCP:3000 -sTCP:LISTEN)" ]; then

    zenity --info --text=$(tail /home/pi/clock/log.txt) \
      --title="Clock log" --timeout=1 --ok-label Quit $ zenity --info \
      --text=$(tail /home/pi/clock/log.txt)   --title="Clock log" 2>/dev/null
    echo "Not in use!"
  else
    launched=true

    chromium-browser --start-fullscreen --incognito --app  http://0.0.0.0:3000
  fi
done

while [ "$launched" = true ]; do
  if [ -z "$(sudo lsof -nP -iTCP:3000 -sTCP:LISTEN)" ]; then
      echo "balls" >> /home/pi/clock/log.txt
    fi
done