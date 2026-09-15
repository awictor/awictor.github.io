# CssPattern

**Pure-CSS background pattern generator** — build repeating stripes, checkerboard, and polka-dot backgrounds with adjustable colors and size, a live preview, and copy-ready CSS. One offline HTML file, no signup, no tracking.

👉 **[Open CssPattern](https://awictor.github.io/css-pattern/)**

## Features
- Three patterns: stripes (any angle), checkerboard, dots (adjustable radius)
- Pure CSS gradients — no images, infinitely scalable, tiny
- Live preview and copy-ready declarations
- Dark mode; 100% client-side

## Why
CSS gradients can make crisp, resolution-independent background patterns, but the syntax (repeating-linear, conic, radial) is fiddly to write by hand. CssPattern generates it and previews it live, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`stripes`, `checkerboard`, `dots`, `toCss`) are covered by headless tests — gradient type, stripe period = 2×size, checkerboard tile doubling, dot sizing, color substitution, CSS formatting, angle handling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
