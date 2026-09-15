# GradientGen

**CSS gradient generator** — build linear and radial gradients with as many color stops as you like, see them live, and copy the ready-to-paste CSS. One offline HTML file, no signup, no tracking.

👉 **[Open GradientGen](https://awictor.github.io/gradient-gen/)**

## Features
- Linear (with angle slider) and radial gradients
- Unlimited color stops with color pickers and per-stop position
- Add / remove stops; "add" auto-spaces them evenly
- Live preview and copy-ready `background:` CSS
- Dark mode, remembers your gradient
- 100% client-side; works offline

## Why
Gradients are everywhere in modern UI, but hand-writing the CSS and guessing stop positions is tedious. GradientGen gives you a live preview and clean output in seconds. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`stopStr`, `linearGradient`, `radialGradient`, `buildGradient`, `autoPositions`) are covered by headless regression tests with exact-string assertions and even-spacing checks; CI runs them on every push.

## License
MIT © Alex Wictor
