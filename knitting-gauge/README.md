# Knitting Gauge Calculator 🧶

Convert knitting gauge to stitch counts: cast-on stitches for a target width, finished width for a stitch count, and stitches per inch.

**[Open the app →](https://awictor.github.io/knitting-gauge/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
stitches per inch = gauge (per 4 in) ÷ 4
cast-on           = width × stitches per inch
width             = stitches ÷ stitches per inch
```

Measure gauge on a washed swatch. Get it wrong and the piece comes out the wrong size even with the right stitch count. If your swatch doesn't match the pattern, change needle size (bigger needles = fewer stitches per inch) rather than fighting your tension.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
