# SciNotation

**Scientific & engineering notation converter** — turn any number into scientific (`1.234e+4`) and engineering (exponent a multiple of 3) notation, count its significant figures, and round to N sig figs. One offline HTML file, no signup, no tracking.

👉 **[Open SciNotation](https://awictor.github.io/sci-notation/)**

## Features
- Scientific and engineering notation side by side
- Significant-figure count using the standard rules
- Round any number to N significant figures
- Accepts plain decimals or existing scientific notation
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Students and engineers convert between plain, scientific, and engineering notation constantly — and sig-fig rules trip everyone up. SciNotation does all of it in one place, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`fromString`, `toScientific`, `roundSig`, `toEngineering`, `sigFigCount`) are covered by headless regression tests: exponent-multiple-of-3 engineering, sig-fig rules (1200 → 2, 1200. → 4, 0.00120 → 3), and rounding; CI runs them on every push.

## License
MIT © Alex Wictor
