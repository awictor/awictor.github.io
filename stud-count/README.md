# Wall Stud Count 🪚

Count how many **studs** and how much **plate lumber** a wall needs from its length and stud spacing. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Studs = ceil(length ÷ spacing) + 1 for the end stud.
- Plate lumber for single or doubled top plate.
- 12" / 16" / 24" on-center options.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter wall length and pick spacing and plate config.

> Straight-run count — add extra studs for corners, intersections, and each opening.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
