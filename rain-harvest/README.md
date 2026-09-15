# Rainwater Harvest 🌧️

Estimate how many **gallons of rainwater** you can collect from a roof area and rainfall depth, with a collection-efficiency factor. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Gallons = area × rainfall × 0.623 (gallons per sq ft per inch).
- Adjustable collection efficiency plus a theoretical maximum.
- Output in gallons and liters.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter roof footprint, rainfall, and efficiency.

> Measure the roof footprint, not the sloped surface — pitch doesn't change catchment.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
