# Darts Checkout 🎯

Find a valid **darts checkout** — a finish that ends on a double — for any score from 2 to 170. Single HTML file, fully offline, nothing leaves your device.

## Why

The math on a 501 finish is genuinely hard under pressure: you must land the last dart on a double, in as few darts as possible, and half the numbers have a "nice" route you'd never spot mid-leg. This searches every single/double/treble combination and hands you a finish.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/darts-checkout/
- Enter your **score remaining** (2–170).
- Read the suggested route, how many darts it takes, and the finishing double.

## How it works

- In 501 you must finish exactly on a double (the bullseye counts as the double of 25).
- The search prefers efficient routes (trebles first) and always lands the last dart on a double.
- The highest three-dart checkout is 170 (T20, T20, Bull).
- "Bogey" numbers — 169, 168, 166, 165, 163, 162, 159, and 1 — have no three-dart finish; the tool says so.
- Multiple finishes usually exist; pick the double you shoot best.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
