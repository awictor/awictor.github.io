# TypeScale

**Modular type scale generator** — pick a base font size and a ratio to generate a harmonious set of font sizes (px + rem) with a live preview. One offline HTML file, no signup, no tracking.

👉 **[Open TypeScale](https://awictor.github.io/type-scale/)**

## Features
- Named ratios from minor second (1.067) to the golden ratio (1.618)
- Adjustable base and steps up/down
- px and rem values per step, with an "Ag" preview at each size
- Dark mode, remembers your settings
- 100% client-side; works offline

## Why
Consistent typography comes from a modular scale, not arbitrary sizes. TypeScale builds one from `size = base × ratio^step` and shows it instantly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `modularScale` function is covered by headless regression tests, including negative steps and common ratios; CI runs them on every push.

## License
MIT © Alex Wictor
