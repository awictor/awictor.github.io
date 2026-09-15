# ColorConvert

**HEX / RGB / HSL color converter** — type a color in any format and see the other two instantly, with a live swatch and one-tap copy. One offline HTML file, no signup, no tracking.

👉 **[Open ColorConvert](https://awictor.github.io/color-convert/)**

## Features
- Three synced inputs — edit HEX, RGB, or HSL and the others update live
- Native color picker + live swatch
- Copy any format with one tap; accepts shorthand hex (`#08f`)
- Dark mode, remembers your last color
- 100% client-side; works offline

## Why
Designers and developers juggle color formats constantly. ColorConvert keeps HEX, RGB, and HSL in sync so you can paste whatever you have and copy whatever you need. Pairs well with [Contrast](https://awictor.github.io/contrast/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `rgbToHsl`, `hslToRgb`, `parseRgb`, `parseHsl`) are covered by headless regression tests against known values, including round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
