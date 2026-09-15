# Viewport Units Converter

**Convert between pixels and viewport units** — vw, vh, vmin, and vmax — for any viewport size. See the same px value expressed as vw across common breakpoints. One offline HTML file, no signup, no tracking.

👉 **[Open Viewport Units](https://awictor.github.io/viewport-units/)**

## Units
- **vw** = 1% of viewport width, **vh** = 1% of height
- **vmin** / **vmax** use the smaller / larger of the two dimensions
- Unlike rem (root font size), viewport units scale with the window

## Features
- px ↔ vw / vh / vmin / vmax for a chosen viewport
- Tap any result to copy
- Table of the same px as vw across 375–1920px
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pxToVw`, `vwToPx`, `pxToVh`, `vhToPx`, `pxToVmin`, `pxToVmax`) are covered by headless tests — conversions and inverses, vmin/vmax dimension selection, the square-viewport identity, scaling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
