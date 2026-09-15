# SWOLF Score 🏊

Compute your **SWOLF score** — strokes + seconds per length — to track swimming efficiency, with a rating band. Single HTML file, fully offline, nothing leaves your device.

## Why

SWOLF ("swim golf") is the single best number for tracking stroke efficiency: it combines how many strokes you take with how long you take, so you can't game it by thrashing harder. Watches show it per length; this lets you compute it by hand and average a whole set.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/swolf/
- Enter your **strokes per length** and **time per length**.
- Read the SWOLF score (lower is better) and its rating band.

## How it works

- SWOLF = strokes per length + seconds per length. Like golf, lower wins.
- Gliding further per stroke drops the count; swimming faster drops the time — both improve the score.
- Rough 25 m bands: under 30 excellent, 30–40 good, 40–50 average, over 50 developing. Longer pools shift the numbers, so compare like with like.
- Track it in the same pool over time; a falling SWOLF at the same pace means real technique gains.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
