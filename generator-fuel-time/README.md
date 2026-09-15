# Generator Fuel Time 🔌

Estimate how long a **generator** runs on a tank of fuel from its rated power, load level, and tank size. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/generator-fuel-time/).

Enter the generator's rated power, the load as a percent of rated, and the tank size. You get the estimated run time, fuel burn per hour, and power delivered.

## How it works

- A gallon of gasoline yields roughly 10 kWh of electricity through a generator, so burn ≈ delivered kW × 0.11 gal per hour.
- Delivered power = rated power × load fraction; run time = tank ÷ fuel burn.
- Lighter loads stretch a tank, but running under ~25% for long invites wet-stacking on diesel units.
- This is a gasoline estimate — propane and diesel differ; use your unit's published consumption when you have it.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
