# Basic Overview

To change the schedule you want to show please edit the `schedule.js` file in the root directory `/components`.

If you want to add a schedule with new times please edit the **JSON** file named `schedule.json` in the root directory `/components`.

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

#### pi

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
