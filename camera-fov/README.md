# Camera Field of View 📷

Calculate **horizontal, vertical, and diagonal field of view** from focal length and sensor size, for any camera format. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Angle of view = 2 × arctan(sensor ÷ 2·focal), on all three axes.
- Presets for full frame, APS-C, Micro Four Thirds, and 1" sensors.
- Wide / normal / telephoto verdict.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Pick a sensor format and enter the focal length.

> A 50 mm lens is "normal" on full frame but a short telephoto on a cropped sensor — the math shows why.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
