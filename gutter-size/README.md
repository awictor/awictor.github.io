# Gutter Size 🏠

Find whether a **5-inch or 6-inch K-style gutter** fits your roof, from footprint area, roof pitch, and local rainfall intensity. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Pitch factor (1.0–1.3) scales footprint for steeper roofs.
- Design area = footprint × pitch factor × rainfall intensity (1"/hr chart basis).
- Recommends 5", 6", or 6"+extra downspouts against standard capacities.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter footprint area, roof pitch, and rainfall intensity.

> Add a downspout every 30–40 ft of gutter run regardless of size.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
