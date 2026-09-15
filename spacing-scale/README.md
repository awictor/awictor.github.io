# SpacingScale

**Design-token spacing scale generator** — build a spacing scale (linear 4/8-pt or geometric ratio) for a design system, previewed as bars and output as copy-ready CSS custom properties in px and rem. One offline HTML file, no signup, no tracking.

👉 **[Open SpacingScale](https://awictor.github.io/spacing-scale/)**

## Features
- **Linear** (multiples of a 4/8-px base) or **geometric** (ratio) scales
- Live bar preview and `--space-N` CSS variables with px + rem
- Configurable base, step count, ratio, and root font size
- Dark mode; 100% client-side

## Why
Consistent spacing is the backbone of a design system. SpacingScale generates the token set — on a grid or on a ratio — and hands you the CSS variables, offline. Complements [type-scale](https://awictor.github.io/type-scale/) (font sizes) and [BaselineGrid](https://awictor.github.io/baseline-grid/) (vertical rhythm). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`linearScale`, `ratioScale`, `tokens`) are covered by headless tests — linear multiples, geometric rounding, monotonicity, first step, length, CSS token/rem output, the 8-pt scale, powers of two, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
