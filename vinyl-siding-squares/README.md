# Vinyl Siding Squares 🏘️

Estimate how many **squares of vinyl siding** you need from wall area, with a waste allowance. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Squares = area × (1 + waste) ÷ 100, rounded up (1 square = 100 sq ft).
- Net squares and area-with-waste breakdown.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter total wall area and waste %.

> Don't subtract small windows and doors — that's your waste margin. Add extra for gables and corners.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
