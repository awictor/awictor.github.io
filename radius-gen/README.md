# RadiusGen

**CSS border-radius generator** — round each corner independently in px or %, with a live preview and presets (sharp, rounded, pill, circle), then copy the CSS. One offline HTML file, no signup, no tracking.

👉 **[Open RadiusGen](https://awictor.github.io/radius-gen/)**

## Features
- Per-corner sliders (top-left, top-right, bottom-right, bottom-left)
- px and % units; presets for common shapes
- Collapses to shorthand when all corners match
- Live preview; copy-ready CSS; dark mode; remembers your settings
- 100% client-side; works offline

## Why
Rounding corners individually and remembering the TL/TR/BR/BL shorthand order is fiddly. RadiusGen shows the shape live and outputs clean, collapsed CSS. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildRadius`, `withProperty`) are covered by headless regression tests: shorthand collapsing, four-value ordering, px/% units, and fallback handling; CI runs them on every push.

## License
MIT © Alex Wictor
