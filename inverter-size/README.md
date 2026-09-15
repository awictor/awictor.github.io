# Inverter Size ⚡

Size a power **inverter** from your running watts and largest motor's surge, with a safety margin. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/inverter-size/).

Enter total running watts, the largest motor's running watts, and a safety margin. You get the continuous rating needed and the peak/surge demand.

## How it works

- Continuous rating should exceed your total running watts with a ~25% margin.
- Motors draw about 3× their running watts for a moment at startup — the inverter's surge rating must cover that.
- Peak demand = the rest of the load plus the largest motor's start surge (only one big motor usually starts at a time).
- Add up nameplate watts of everything that could run at once; err high, since inverters derate when hot.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
