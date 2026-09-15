# TransformGen

**CSS transform generator** — combine translate, rotate, scale, and skew with a live preview, then copy the `transform:` CSS. One offline HTML file, no signup, no tracking.

👉 **[Open TransformGen](https://awictor.github.io/transform-gen/)**

## Features
- translateX/Y, rotate, scaleX/Y, skewX/Y sliders with live preview
- Correct units (px, deg); identity values are omitted from the output
- Copy-ready CSS; reset; dark mode; remembers your settings
- 100% client-side; works offline

## Why
Chaining CSS transforms by hand means remembering each function's unit and that order matters. TransformGen shows the result live and outputs clean CSS in the right order. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildTransform`, `withProperty`) are covered by headless regression tests: units, defined ordering, identity omission, negatives, and non-numeric fallback; CI runs them on every push.

## License
MIT © Alex Wictor
