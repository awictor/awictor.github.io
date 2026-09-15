# Mortar Mix Calculator 🧱

Estimate how many **bags of mortar** and **tons of sand** you need to lay concrete block or brick. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Block: ~3 bags per 100. Brick: ~7 bags per 1,000.
- Sand estimate at ~1 ton per 8 bags.
- Rounds up with a waste cushion baked in.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter the unit count and pick block or brick.

> Joint thickness and block size shift the numbers — treat the result as a solid starting estimate.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
