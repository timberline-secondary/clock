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
```

Finally to run the development server please run:

```bash
npm run dev
# or
yarn dev
```

#### What to run on pi start

```bash
git pull
```

```bash
npm i
```

```bash
npm run dev
```

```bash
chromium --app https://localhost:300 --start-fullscreen
```
