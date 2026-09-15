# BaselineGrid

**Vertical rhythm calculator** — pick a base font size and line-height to get a baseline rhythm unit, a spacing scale, and the exact line-heights that snap any type size onto the grid, with a live preview and copy-ready values. One offline HTML file, no signup, no tracking.

👉 **[Open BaselineGrid](https://awictor.github.io/baseline-grid/)**

## Features
- Rhythm unit = base font size × line-height
- Spacing scale as whole multiples of the unit (for margins/padding)
- Snaps any set of type sizes to a whole number of baseline units, giving the line-height for each
- Live grid preview; dark mode; 100% client-side

## Why
Consistent vertical rhythm is what makes typography feel calm and intentional, but the line-height math is fiddly. BaselineGrid computes the unit, the spacing scale, and per-size line-heights so every element lands on the baseline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`baselineUnit`, `snap`, `spacingScale`) are covered by headless tests — the unit formula, snapping at/above/just-over unit boundaries, exact multiples, the minimum-one-line rule, line-box ≥ font-size invariant, the px = size × line-height relationship, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
