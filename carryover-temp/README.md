# Carryover Cooking 🌡️

Find the temperature to **pull meat off the heat** so carryover cooking lands it at your target during the rest. Single HTML file, fully offline, nothing leaves your device.

## Why

Meat keeps cooking after it leaves the heat — pull it *at* your target and it overshoots to well-done by the time you slice. The fix is to pull early by the carryover amount, but that amount depends on the cut. This does the subtraction and reminds you which way to lean.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/carryover-temp/
- Enter your **target final temperature**.
- Pick a **cut/size** (or a custom rise).
- Read the pull temperature, the carryover rise, and the temperature it rests up to.

## How it works

- Pull temp = target − expected carryover rise.
- Bigger, hotter-cooked cuts carry over more (8–15°F); thin steaks and low-and-slow BBQ carry over less.
- Rest tented 10–20 minutes so heat evens out and juices redistribute.
- Hit safe minimums for poultry and ground meat *after* carryover.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
