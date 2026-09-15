# Pool Heater BTU 🏊

Size a **pool heater** in BTU from surface area and temperature rise, and estimate heat-up time from pool volume. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/pool-heater-btu/).

Enter the pool length, width, average depth, and the temperature rise you want. You get the recommended heater output, pool volume, and heat-up time.

## How it works

- A common rule sizes a heater at surface area × temperature rise × 12 BTU/hr — surface area drives heat loss.
- Pool volume = length × width × average depth × 7.48 gallons per cubic foot.
- Heat-up time = volume × 8.34 × temperature rise ÷ heater BTU (ignoring ongoing surface loss).
- A cover cuts loss dramatically — the single biggest thing you can do to heat faster and cheaper.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
