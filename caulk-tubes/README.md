# Caulk Coverage 🧴

Estimate how many **tubes of caulk** you need from the joint length and bead size. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Coverage per 10.1 oz tube by bead size (1/8"–1/2"), dropping with bead² .
- Tubes needed = joint length ÷ coverage, rounded up.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter total joint length and pick the bead size.

> Buy one extra — nozzle priming, tip cuts, and wide beads all eat into a tube.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
