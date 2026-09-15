# Faucet Flow Rate 💧

Measure a faucet or showerhead's **flow rate in GPM** from how long it takes to fill a container, check it against limits, and see daily and yearly water usage. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- GPM = gallons ÷ (seconds ÷ 60) from a simple fill test.
- Pass/fail against a standard limit (2.2 faucet, 2.5 shower).
- Daily and yearly usage from minutes-per-day.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Time filling a known container, enter the size and seconds.

> A low-flow aerator can cut a faucet to 1.0–1.5 GPM and pays for itself fast.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
