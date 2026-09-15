# Grout Calculator 🪣

Estimate how much **tile grout** you need from tile size, joint width and depth, and total area. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Grout volume per square foot: ((L + W) ÷ (L × W)) × joint width × joint depth × 144 cubic inches.
- Accounts for the big driver most calculators miss: smaller tiles need far more grout.
- Net and with-waste (10%) totals plus an estimated 25 lb bag count.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter your area, tile size, and joint size.

> Buy a little extra from the same lot — grout color can vary batch to batch.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
