# Palette from Image

**Extract a color palette from any image** — right in your browser. Drop a photo, pick how many colors, and get hex swatches you can copy. The image is never uploaded; everything runs locally. One offline HTML file, no signup, no tracking.

👉 **[Open Palette from Image](https://awictor.github.io/image-palette/)**

## How it works
The image is drawn to a canvas and its pixels are grouped into color buckets; the most common buckets become the palette (averaged for a clean hex). Choose 2–12 colors; tap any swatch to copy.

## Features
- Fully local — no upload, no server
- 2–12 dominant colors; tap-to-copy hex
- Drag-and-drop or file picker; dark mode

## Tests
```
node tests/selftest.mjs
```
The pure functions (`quantize`, `rgbToHex`) are covered by headless tests on synthetic pixel arrays — single/most-frequent colors, k limiting, bucket merging, count sums, hex formatting/clamping, and the default k. CI runs them on every push.

## License
MIT © Alex Wictor
