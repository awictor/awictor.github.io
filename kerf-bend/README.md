# Kerf Bending 🪚

Work out how many **kerf cuts** you need to bend a board around a radius, from the bend geometry and your test-kerf spacing. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Arc length = radius × angle (radians); cuts = arc ÷ spacing, rounded up.
- Uses the empirical test-kerf spacing woodworkers actually measure.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter bend radius, angle, and your measured kerf spacing.

> Find spacing from a test kerf in scrap: lift the end until the kerf just closes, then measure the distance.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
