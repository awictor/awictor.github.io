# Water Heater Peak Demand 🚿

Estimate your busiest-hour hot water demand and match it to a water heater's **First Hour Rating**. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/water-heater-first-hour/).

Enter how many showers, baths, dishwasher loads, and hot clothes loads happen in your busiest hour, plus the heater's First Hour Rating. You get the peak demand and whether the heater keeps up.

## How it works

- Add up the hot water used in your busiest hour — the morning rush or evening cleanup.
- Typical draws: shower 12 gal, bath 20 gal, dishwasher 14 gal, a hot clothes load 30 gal.
- A tank heater's First Hour Rating is how much hot water it delivers in one hour from full — match it to your peak demand.
- Tankless units are rated in gallons per minute instead, so size those by simultaneous flow, not first-hour gallons.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
