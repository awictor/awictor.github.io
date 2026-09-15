# Oklch

**Hex ⇄ OKLCH color converter** — convert any color between hex/RGB and OKLCH, the modern perceptual CSS color space, with a live swatch, L/C/H sliders, and a copy-ready `oklch()` string. One offline HTML file, no signup, no tracking.

👉 **[Open Oklch](https://awictor.github.io/oklch/)**

## Features
- Accurate conversion using Björn Ottosson's OKLab matrices (matches published values)
- Live swatch, color picker, hex field, and Lightness/Chroma/Hue sliders
- Copy-ready `oklch(L% C H)` for CSS; out-of-gamut requests clamp to valid hex
- Dark mode; 100% client-side

## Why
OKLCH is perceptually uniform — equal numeric steps look equally different — so it's far better than HSL for building palettes and adjusting lightness. Oklch converts both ways offline so you can adopt it without a build step. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToOklch`, `oklchToHex`, gamma transfer, `formatOklch`) are covered by headless tests — hex parsing, the sRGB gamma curve, white/black endpoints, the published OKLCH values for red/green/blue, achromatic grays, lightness ordering, exact hex round-trips, and gamut clamping. CI runs them on every push.

## License
MIT © Alex Wictor
