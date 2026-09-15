# Bike Chain Length ⛓️

Work out the right **bike chain length** in inches and links from chainring teeth, cog teeth, and chainstay length. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Rigid-frame formula: L = 2 × chainstay + chainring/4 + cog/4 + 1.
- Converts to links (½-inch pitch) and rounds up to an even count.
- Sizes to the big-big combo so the chain is never too short.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter chainstay length and your largest chainring and cog.

> Full-suspension frames need extra length for travel — follow the frame maker's guidance.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
