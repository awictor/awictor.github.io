# Rebar Lap Splice 🏗️

Estimate the **rebar lap splice (overlap) length** from bar size and a lap factor, with the 12-inch code minimum. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Lap length ≈ factor × bar diameter (40× typical, 48× conservative, 60× poor conditions).
- Bar diameter from number (size ÷ 8).
- Enforces the 12-inch code minimum.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Pick a bar size and lap factor.

> Planning estimate only — actual lap length must follow ACI 318 and the engineer's drawings.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
