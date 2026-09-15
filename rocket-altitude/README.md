# Rocket Altitude Tracker 🚀

Estimate a model rocket's **peak altitude** from a single tracking station — a known baseline distance and the measured elevation angle at apogee. Single HTML file, fully offline, nothing leaves your device.

## Why

Onboard altimeters are great, but plenty of low-power flights are still tracked from the ground with an altiscope. The trig is simple — altitude = baseline × tan(angle) — but doing it in your head at the field is error-prone. This gives the apogee, the slant range, and a sanity note when the angle gets too steep to trust.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/rocket-altitude/
- Enter the **baseline** from your tracking spot to the pad.
- Enter the **elevation angle** measured at apogee.
- Add your **eye height** for altitude above the ground.
- Read the apogee, the altitude above eye level, and the slant range.

## How it works

- Altitude above eye = baseline × tan(angle); apogee adds your eye height.
- At 45° the altitude equals the baseline — a handy check. Above ~80° the estimate gets very sensitive.
- Slant range = baseline ÷ cos(angle), always longer than the altitude.
- Single-station assumes a vertical flight over the pad; clubs use two stations and average to handle wind drift.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
