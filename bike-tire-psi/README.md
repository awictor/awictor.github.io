# Bike Tire Pressure 🚴

Estimate a **starting bike tire pressure** from your total system weight and tire width, with lower-front / higher-rear splits. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Pressure rises with weight and falls with tire width.
- Front runs ~10% lower than rear (the rear carries more load).
- Works for road, gravel, and MTB widths.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter total system weight (you + bike + gear) and tire width.

> A starting point — never exceed the max pressure printed on the tire sidewall.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
