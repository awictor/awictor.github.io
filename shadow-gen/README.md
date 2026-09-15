# ShadowGen

**CSS box-shadow generator** — stack multiple shadow layers, toggle inset, tune offset / blur / spread / color, and copy ready-to-paste CSS with a live preview. One offline HTML file, no signup, no tracking.

👉 **[Open ShadowGen](https://awictor.github.io/shadow-gen/)**

## Features
- Unlimited stacked shadow layers (add / remove)
- Per-layer X/Y offset, blur, spread, color, and inset
- Live preview on a sample element
- Copy-ready `box-shadow:` CSS; dark mode; remembers your work
- 100% client-side; works offline

## Why
Layered box-shadows create the most realistic depth in modern UI, but writing them by hand is fiddly. ShadowGen gives you a live preview and clean multi-layer output. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`px`, `shadowLayer`, `boxShadow`, `withProperty`) are covered by headless regression tests with exact-string assertions, defaults, inset, and multi-layer joins; CI runs them on every push.

## License
MIT © Alex Wictor
