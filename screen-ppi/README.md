# Screen PPI Calculator 🖥️

Calculate a display's **PPI (pixels per inch)**, **dot pitch**, and **total pixels** from its resolution and diagonal size. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- PPI = √(width² + height²) ÷ diagonal inches.
- Dot pitch in mm and total megapixels.
- Density verdict for typical viewing distance.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter the resolution and diagonal size.

> Two screens with the same resolution differ in sharpness only by size — a smaller panel packs pixels tighter.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
