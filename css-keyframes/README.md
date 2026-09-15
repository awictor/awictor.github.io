# Keyframes

**CSS @keyframes animation generator** — pick a preset (fade, slide, spin, pulse, bounce, shake), tune duration, timing, iterations and direction, preview it live, and copy the `@keyframes` + `animation` CSS. One offline HTML file, no signup, no tracking.

👉 **[Open Keyframes](https://awictor.github.io/css-keyframes/)**

## Features
- Six ready-made animations as starting points
- Adjustable duration, timing function, iteration count, and direction
- Live, replayable preview; copy-ready `@keyframes` block + `.animated` rule
- Dark mode; remembers your settings; 100% client-side; works offline

## Why
Hand-writing `@keyframes` and remembering the `animation` shorthand order is fiddly. Keyframes previews the motion and hands you correct CSS you can tweak. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`keyframesCss`, `animationValue`, `fullCss`, `PRESETS`) are covered by headless tests — numeric stop ordering, multi-declaration stops, shorthand order/defaults, and delay handling; CI runs them on every push.

## License
MIT © Alex Wictor
