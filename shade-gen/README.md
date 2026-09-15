# ShadeGen

**Color tint & shade scale generator** — enter one hex color and get a full 50–950 palette (tints toward white, shades toward black), ready to copy as CSS custom properties. One offline HTML file, no signup, no tracking.

👉 **[Open ShadeGen](https://awictor.github.io/shade-gen/)**

## Features
- 11-step scale (50, 100 … 900, 950) with your color normalized as the 500 base
- Tints built toward white, shades toward black — luminance stays monotonic
- Click any swatch to copy its hex; one-click CSS-variable export
- Native color picker + hex input, kept in sync
- Dark mode, remembers your color
- 100% client-side; works offline

## Why
Design systems need a consistent set of tints and shades from a single brand color — the same 50–950 ramp Tailwind popularized. ShadeGen produces it instantly and offline, no account or paid tool required. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `mix`, `tint`, `shade`, `luminance`, `scale`, `toCssVars`) are covered by headless regression tests, including exact channel mixing, clamping, and monotonic-luminance checks; CI runs them on every push.

## License
MIT © Alex Wictor
