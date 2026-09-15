# Bike Frame Size 🚲

Estimate your **road, mountain, or hybrid bike frame size** from your inseam, using the standard sizing multipliers. Single HTML file, fully offline, nothing leaves your device.

## Why

Height charts are rough; leg length is what actually fits a bike. Measuring your inseam and applying the right multiplier for the bike type gets you a far better starting size — essential when buying online or used, where you can't just swing a leg over.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/bike-frame/
- Enter your **inseam** in centimeters (crotch to floor, barefoot).
- Pick the **bike type**.
- Read the recommended frame size (cm), the MTB size in inches, and the standover-clearance target.

## How it works

- Road frame (cm) = inseam × 0.665; mountain = inseam × 0.574 (or × 0.226 for inches); hybrid ≈ inseam × 0.63.
- Aim for a couple of inches of standover clearance — more for mountain, less for road.
- These are ballpark sizes; final fit depends on reach, saddle height, and stem, so test ride.
- Between sizes? Size down for sportier handling, up for comfort.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
