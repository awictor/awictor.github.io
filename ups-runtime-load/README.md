# UPS Runtime 🔋

Estimate how long a **UPS** runs from battery capacity, voltage, and connected load in watts. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/ups-runtime-load/).

Enter the battery amp-hours, voltage, connected load in watts, and inverter efficiency. You get the estimated backup time and battery energy.

## How it works

- Battery energy (Wh) = amp-hours × voltage; two 12V 9Ah batteries in series give 216 Wh.
- Runtime (min) = energy × efficiency ÷ load × 60 — inverter losses run about 10%.
- Real runtime is a bit shorter under heavy load (Peukert effect) and as batteries age.
- Size for a graceful shutdown, not to ride out long outages — a few minutes usually covers safe power-down.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
