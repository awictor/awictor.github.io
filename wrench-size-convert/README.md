# Wrench Size Converter 🔩

Convert between **metric (mm) and SAE (inch)** wrench and socket sizes, and find the nearest match. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/wrench-size-convert/).

Pick the direction and enter a size. You get the exact conversion, the nearest usable size, and the difference.

## How it works

- One inch is exactly 25.4 mm, so mm ÷ 25.4 gives inches and inch × 25.4 gives mm.
- SAE wrenches come in fractions of an inch — the nearest usable size is rounded to the closest 1/32″.
- A 13 mm and a 1/2″ are close (0.02″ apart) but not identical — a snug metric socket is safest on metric bolts.
- If the difference is more than a few thousandths of an inch, use the correct-standard tool to avoid rounding the fastener.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
