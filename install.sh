#!/bin/bash

# Installer script for the pi-clock

#autostart script
echo "@lxpanel --profile LXDE-pi
 @pcmanfm --desktop --profile LXDE-pi
 #@xscreensaver -no-splash
 @bash /home/pi/clock/launcher2.sh
 @xset s off
 @xset -dpms
 @xset s noblank
 #@chromium-browser --incognito --kiosk www.clocktab.com
 @unclutter -idle 0" >> /home/pi/.config/lxsession/LXDE-pi/autostart

 #github cloning
 git clone https://github.com/timberline-secondary/clock /home/pi/clock

 #systemd probing (timer)
 echo "[Unit]
       Description=Timer for the clock probe

       [Timer]
       OnUnitActiveSec=420s
       OnBootSec=420s

       [Install]
       WantedBy=timers.target" >> /etc/systemd/system/probe.timer

 #systemd probing (unit file)
 echo "[Unit]
       Description=Probe for the clock

       [Service]
       type=oneshot
       User=pi
       WorkingDirectory=/home/pi/clock
       ExecStart=/bin/bash /home/pi/clock/probe.sh" >> /etc/systemd/system/probe.service

# enable services
systemctl daemon-reload
systemctl enable probe.timer

# finished
echo "✨ Installed pi-clock! Please reboot the system! :)"