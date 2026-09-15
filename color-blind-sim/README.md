# ColorBlind

**Color blindness (CVD) palette simulator** — paste one color or a whole palette and see how each looks with protanopia, deuteranopia, tritanopia and grayscale vision, side by side. Spot pairs that become indistinguishable before they ship. One offline HTML file, no signup, no tracking.

👉 **[Open ColorBlind](https://awictor.github.io/color-blind-sim/)**

## Features
- Simulates the three main color vision deficiencies plus grayscale
- Checks a full palette at once — a row per color, a column per vision type
- Accepts `#rrggbb`, `#rgb`, with or without `#`, space/comma/newline separated
- Dark mode; remembers your palette; 100% client-side; works offline

## Why
Roughly 1 in 12 men has some color vision deficiency, so a red/green status pair or a chart legend can be invisible to real users. ColorBlind shows the risk instantly, locally, before it reaches production. Part of the [Toolkit](https://awictor.github.io/toolkit/).

> Simulation uses standard CVD transform matrices — a useful approximation, not a clinical model.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `applyMatrix`, `simulate`, `parseColors`) are covered by headless tests, including known matrix results, white/black invariance, and clamping; CI runs them on every push.

## License
MIT © Alex Wictor
