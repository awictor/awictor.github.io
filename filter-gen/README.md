# FilterGen

**CSS filter generator** — dial in blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, and sepia with a live preview, then copy the `filter:` CSS. One offline HTML file, no signup, no tracking.

👉 **[Open FilterGen](https://awictor.github.io/filter-gen/)**

## Features
- All eight standard CSS filter functions with sliders and live preview
- Correct units (px, deg, %) per function
- Only non-default values are emitted; all-default collapses to `none`
- Copy-ready CSS; reset; dark mode; remembers your settings
- 100% client-side; works offline

## Why
Stacking CSS filters by hand means remembering each function's unit and sensible ranges. FilterGen shows the effect live and outputs clean CSS in the correct order. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildFilter`, `withProperty`) are covered by headless regression tests: correct units, defined ordering, default omission, invalid-value fallback, and the full stack; CI runs them on every push.

## License
MIT © Alex Wictor
