# PPICalc

**Pixel density (PPI) calculator** — enter a screen's resolution and diagonal size to get its pixels-per-inch, dot pitch, megapixels, and aspect ratio. Handy presets for common displays and phones. One offline HTML file, no signup, no tracking.

👉 **[Open PPICalc](https://awictor.github.io/ppi-calc/)**

## Features
- PPI from resolution + diagonal (the diagonal-pixels ÷ diagonal-inches formula)
- Dot pitch (mm), total megapixels, and simplified aspect ratio
- One-tap presets (1080p 15.6", 1440p 27", 4K 32", iPhone, …)
- Dark mode; 100% client-side

## Why
Comparing displays means comparing pixel density, not just resolution — a 4K phone and a 4K TV are worlds apart. PPICalc gives you PPI, dot pitch, and aspect ratio instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gcd`, `ppi`, `dotPitchMm`, `megapixels`, `aspectRatio`) are covered by headless tests — known display PPIs, the 3-4-5 identity, dot-pitch and megapixel formulas, aspect-ratio simplification, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor
