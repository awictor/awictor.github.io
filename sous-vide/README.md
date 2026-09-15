# Sous Vide Time 🥩

Estimate **how long sous vide takes to heat food to the core** — from thickness and shape, not weight. Single HTML file, fully offline, nothing leaves your device.

## Why

The single biggest sous vide misconception is that a bigger piece needs proportionally more time. It doesn't — heat-up time scales with the *square* of thickness, and weight barely matters. This tool applies that rule so you stop guessing (and stop pulling cold-centered steaks).

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/sous-vide/
- Enter the **thickness** (or diameter) in millimeters — the shortest path to the center.
- Pick the **shape**.
- Read the heat-up time, plus what happens if you double the thickness.

## How it works

- Time ≈ constant × thickness² × a shape factor, calibrated so a 25 mm slab from the fridge takes about 60 minutes — matching Douglas Baldwin's heating-time tables.
- **Double the thickness → 4× the time.** That square law is the whole point.
- A sphere heats from all sides and a slab effectively from two, so the same thickness cooks faster as a sphere.
- This is **time to temperature**, not doneness or food safety — hold longer for pasteurization or to tenderize tough cuts. Sous vide is forgiving on the upside, so when unsure, hold longer.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
