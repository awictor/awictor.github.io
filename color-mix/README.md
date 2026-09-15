# ColorMix

**Blend two colors & build a step palette** — mix two colors at any ratio and generate an evenly-stepped palette between them, with copy-ready hex. One offline HTML file, no signup, no tracking.

👉 **[Open ColorMix](https://awictor.github.io/color-mix/)**

## Features
- Blend Color A and Color B at any ratio (0–100%) with a live swatch
- Generate a 2–12 step palette interpolated between the two colors
- Color pickers + hex inputs stay in sync; click any swatch to copy its hex
- Dark mode; remembers your colors; 100% client-side; works offline

## Why
Building a set of tints or a smooth ramp between two brand colors by hand is guesswork. ColorMix interpolates precisely in RGB and hands you the hex for every step. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`mix`, `steps`, `mixChannel`, `hexToRgb`, `rgbToHex`) are covered by headless tests — midpoint math, endpoint identity, `t` clamping, step counts, and monotonic ramps; CI runs them on every push.

## License
MIT © Alex Wictor
