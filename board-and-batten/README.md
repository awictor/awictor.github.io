# Board & Batten 🪵

Plan a **board-and-batten accent wall**: how many battens, the even spacing, and total batten lumber from wall width, height, and target spacing. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Battens = ceil(width ÷ target spacing) + 1, so both ends land on a batten.
- Even spacing so the layout is symmetric.
- Total vertical batten linear footage.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter wall width, height, and target spacing.

> Add horizontal top/bottom rails separately — this counts the vertical battens.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
