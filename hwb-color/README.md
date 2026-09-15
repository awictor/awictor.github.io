# HWB Color Converter

**Convert colors between HEX/RGB and HWB** — hue, whiteness, blackness, the CSS Color 4 `hwb()` model. Edit any field and the others update live, with a swatch and one-tap copy. One offline HTML file, no signup, no tracking.

👉 **[Open HWB Converter](https://awictor.github.io/hwb-color/)**

## About HWB
`hwb(300 15% 17%)` starts from a pure hue, then mixes in white and black — intuitive for tints and shades. Raise whiteness to lighten, blackness to darken; when W + B ≥ 100% you get a gray.

## Features
- HEX ↔ RGB ↔ HWB, all synced
- Color picker, live swatch, one-tap copy per format (incl. `hwb()`)
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `rgbToHwb`, `hwbToRgb`) are covered by headless tests — primaries, white/black/gray, tinting/shading, the W+B≥100% gray rule, W=100/B=100 extremes, and RGB→HWB→RGB round trips. CI runs them on every push.

## License
MIT © Alex Wictor
