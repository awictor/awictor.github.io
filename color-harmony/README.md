# Harmony

**Color scheme & palette generator** — pick a base color and get complementary, analogous, triadic, tetradic, split-complementary, and monochromatic schemes, with copy-ready hex. One offline HTML file, no signup, no tracking.

👉 **[Open Harmony](https://awictor.github.io/color-harmony/)**

## Features
- Six classic harmony schemes computed by HSL hue rotation
- Monochromatic set by varying lightness
- Color picker + hex input, kept in sync
- Click a swatch to copy; copy the whole palette at once
- Dark mode, remembers your color and scheme
- 100% client-side; works offline

## Why
Good palettes start from color theory — rotate the hue wheel by the right angles and you get schemes that just work. Harmony does the math and shows the swatches instantly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToHsl`, `hslToHex`, `rotate`, `harmony`) are covered by headless regression tests with exact values for pure hues (triadic of red = red/green/blue, complement of red = cyan) and scheme sizes; CI runs them on every push.

## License
MIT © Alex Wictor
