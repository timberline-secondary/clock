# Basic Overview

To change the schedule you want to show please edit the `schedule.js` file in the root directory `/components`.

If you want to add a schedule with new times please edit the **JSON** file named `schedule.json` in the root directory `/components`.

### Install from scratch

⚠️ Prerequisites include: npm & git

Command:
```
curl -sSL https://github.com/timberline-secondary/clock/blob/main/install.sh | sudo bash
```


#### Run a development server.

To run a development server (assuming you dont already have the code locally) start by running:

```bash
git clone https://github.com/timberline-secondary/clock
```

then run:

```bash
cd clock
```

followed by:

```bash
npm i
#or
yarn
```

Finally to run the development server please run:

```bash
npm run dev
# or
yarn dev
```

#### setup w/o install command

Start by cloning this repo to `/home/pi/clock`

```bash
git clone https://github.com/timberline-secondary/clock /home/pi/clock
```

The pi uses the autostart from `/home/pi/.config/lxsession/LXDE-pi/autostart`.
In the autostart file it reads:

```bash
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
@bash /home/pi/clock/launcher2.sh
@xset s off
@xset -dpms
@xset s noblank
#@chromium-browser --incognito --kiosk www.clocktab.com
@unclutter -idle 0
```

The launcher is located here in launcher2.sh and launches the clock onto the projector.


### systemd services

The pi requires two systemd files for probing to ensure the program is running as expected.

This (below) is the timer which manages the intervals between probes, located in `/etc/systemd/system/probe.timer`
```
[Unit]
Description=Timer for the clock probe

[Timer]
OnUnitActiveSec=420s
OnBootSec=420s

[Install]
WantedBy=timers.target
```

This (below) file is the service that runs the probing process, this file is located in `/etc/systemd/system/probe.service`

```
[Unit]
Description=Probe for the clock

[Service]
type=oneshot
User=root
WorkingDirectory=/home/pi/clock
ExecStart=/bin/bash /home/pi/clock/probe.sh
```

the reason the above does not execute the commands in one-line is because this way provides a more hand-free approach to updating the probing process, only requiring a push to github and the clock will auto-update.