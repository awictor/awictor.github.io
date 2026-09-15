# Specificity

**CSS selector specificity calculator** — paste any selector and see its `(IDs, classes, elements)` score, a color-coded breakdown of every part, and a head-to-head comparison against a second selector. One offline HTML file, no signup, no tracking.

👉 **[Open Specificity](https://awictor.github.io/css-specificity/)**

## Features
- Scores a selector as three numbers: IDs · classes/attributes/pseudo-classes · elements/pseudo-elements
- Color-coded token breakdown so you can see *why* it scored that way
- Compare two selectors and learn which rule wins (and why ties fall to source order)
- Correctly handles `:is()`, `:not()`, `:has()` (most specific argument), `:where()` (zero), and pseudo-elements
- Dark mode; remembers your input; 100% client-side; works offline

## Why
"Why isn't my CSS applying?" is almost always a specificity fight. Specificity spells out the exact score, highlights each contributing part, and tells you which of two selectors wins — no more counting `#`s and `.`s by hand. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`specificity`, `format`, `compare`, `maxSpec`, `splitTopLevel`) are covered by headless tests, including the W3C canonical examples and the functional-pseudo-class rules; CI runs them on every push.

## License
MIT © Alex Wictor
