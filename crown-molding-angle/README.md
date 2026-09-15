# Crown Molding Angles 📐

Compute the **miter and bevel angles** to cut crown molding flat on a compound miter saw, from spring angle and wall corner angle. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Miter = atan(sin(spring) × tan(corner ÷ 2)); bevel = asin(cos(spring) × cos(corner ÷ 2)).
- Presets for 38°, 45°, and 52° crown spring angles.
- Any corner angle, not just 90°.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Pick a spring angle and enter the wall corner angle.

> This is for cutting crown lying flat. Cutting it nested against the fence uses simple 45° miters instead.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
