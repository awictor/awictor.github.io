# Pool Salt Calculator 🏊

Work out how much **salt to add** to a saltwater pool to reach your target salinity, in pounds and 40 lb bags. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Salt (lbs) = gallons × ppm gap × 8.34 ÷ 1,000,000.
- Bag count (40 lb) and the ppm you're raising by.
- Shows zero when you're already at/above target (dilute instead).
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter pool volume, current salt, and target salt (ppm).

> Add in stages, circulate, and re-test before adding more — you can't easily remove excess salt.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
