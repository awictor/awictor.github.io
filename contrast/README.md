# Contrast

**WCAG color contrast checker** — pick two colors and see the exact contrast ratio plus AA/AAA pass-fail for normal and large text, with a live preview. One offline HTML file, no signup, no tracking.

👉 **[Open Contrast](https://awictor.github.io/contrast/)**

## Features
- Exact contrast ratio (1:1 to 21:1) using the WCAG 2.x relative-luminance formula
- Pass/fail badges for **AA** (4.5 normal / 3 large) and **AAA** (7 / 4.5)
- Native color pickers + hex inputs, swap button, live text preview
- Shareable link — both colors travel in the URL
- Dark mode, remembers your last colors
- 100% client-side; works offline

## Why
Accessibility isn't optional. Contrast makes it a two-second check: paste a foreground and background color and know immediately whether your text is readable — and to which WCAG level. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalizeHex`, `hexToRgb`, `relativeLuminance`, `contrastRatio`, `wcagLevels`) are covered by headless regression tests against known WCAG values; CI runs them on every push.

## License
MIT © Alex Wictor
