# Party Drinks Calculator 🍸

Plan how much **beer, wine, and liquor** to buy for a party from your guest count, party length, and drink mix. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Estimates total drinks (≈ guests × (hours + 1) — 2 the first hour, 1 each after).
- Splits your buy list by a beer / wine / liquor mix you control.
- Converts to real units: 5 glasses per wine bottle, 16 shots per liquor bottle, one beer = one drink.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter guests, hours, and the drink mix.

> Round up and buy a little extra — leftovers keep, running out doesn't. Always offer water and a non-alcoholic option.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
