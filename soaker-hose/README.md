# Soaker Hose Run Time 🪴

Work out how long to run a **soaker hose** to apply a target depth of water over a garden bed, from area and hose flow rate. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Water needed = area × depth × 0.623 gallons; run time = gallons ÷ flow rate.
- Formatted hours-and-minutes run time.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter bed area, target depth, and hose flow rate (GPM).

> Most beds want ~1 inch of water per week. Measure your hose's real GPM by timing a container fill.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
