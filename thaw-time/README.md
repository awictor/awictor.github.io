# Meat Thaw Time 🧊

Estimate how long frozen meat takes to thaw **safely** — in the refrigerator or in a cold-water bath — by weight. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- **Refrigerator estimate** — ~24 hours per 5 lb (≈4.8 hr/lb), the safest method.
- **Cold-water bath estimate** — ~30 minutes per pound (change water every 30 min).
- Pounds or kilograms.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter the weight and read both estimates.

> Never thaw meat on the counter — the surface enters the 40–140 °F danger zone while the center is still frozen. Cook cold-water-thawed meat immediately.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
