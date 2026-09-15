# Lumber Weight 🪵

Estimate the **weight of lumber** from species, dimensions, and quantity — for loading, shipping, and structure. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Weight = volume × species density (kiln-dried figures).
- Per-piece and total weight, plus total board feet.
- Species from cedar to oak; use dressed dimensions for accuracy.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Pick a species and enter dimensions and quantity.

> Densities are for ~12% moisture. Fresh-cut green lumber can weigh up to 50% more.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
