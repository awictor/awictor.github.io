# Drywall Sheet Calculator 🧱

Estimate how many **drywall sheets** you need from the total area to cover and your sheet size, with a waste allowance. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Sheets = area × (1 + waste) ÷ area per sheet, rounded up.
- 4×8, 4×10, and 4×12 sheet sizes.
- Shows base count and area-with-waste.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter total area, pick sheet size, set waste %.

> Include walls and ceilings; don't subtract small openings — that's your waste buffer.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
