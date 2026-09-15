# True Airspeed ✈️

Convert **calibrated airspeed to true airspeed** using the standard-atmosphere density ratio. Single HTML file, fully offline, nothing leaves your device.

## Why

Your airspeed indicator reads dynamic pressure, so up high — where the air is thin — the same indicated number means you're really moving faster. Knowing TAS is what makes your flight planning, fuel burn, and ETAs come out right. This does the density-ratio math the E6B does, without the wheel.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/true-airspeed/
- Enter your **calibrated airspeed** in knots.
- Enter the **pressure altitude** in feet.
- Read the true airspeed, the density ratio σ, and the percentage gain over CAS.

## How it works

- TAS = CAS ÷ √σ, where σ is the air density ratio versus sea level.
- σ from the standard atmosphere: σ = (1 − 6.875×10⁻⁶ × h)^4.2561 for altitude h in feet (troposphere model, valid to ~36,089 ft).
- Rule-of-thumb check: TAS climbs about 2% per 1,000 ft — 120 kt at 10,000 ft is near 140 kt true.
- Uses ISA conditions; hotter-than-standard air thins further and pushes TAS higher.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
