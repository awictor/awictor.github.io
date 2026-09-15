# Window Tint VLT 🪟

Work out the **combined visible light transmission (VLT)** when adding tint film over factory glass, and the film needed to hit a legal target. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Combined VLT = film VLT × glass VLT ÷ 100 (what enforcement meters read).
- Legal pass/fail against a minimum you set.
- Reverse: the film VLT needed to just meet the limit on your glass.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter film VLT, factory glass VLT, and your local legal minimum.

> Factory "clear" glass is usually ~78–82% VLT, not 100% — that's why 35% film reads lower.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
