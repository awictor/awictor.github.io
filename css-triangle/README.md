# Triangle

**CSS triangle & arrow generator** — make a pure-CSS triangle with the classic border trick in any of four directions, with size and color, a live preview, and copy-ready CSS. One offline HTML file, no signup, no tracking.

👉 **[Open Triangle](https://awictor.github.io/css-triangle/)**

## Features
- Up / down / left / right directions
- Adjustable size and color; live preview
- Emits the full `width: 0; height: 0;` + border recipe
- Copy-ready CSS; dark mode; 100% client-side

## Why
The border-trick triangle (used for tooltips, dropdown carets, and arrows) is easy to get subtly wrong — which border is colored vs transparent depends on the direction. Triangle generates it correctly and previews it live, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isHex`, `triangleCss`) are covered by headless tests — zero width/height, the colored-vs-transparent border per direction, defaults, and rejection of invalid color/size/direction. CI runs them on every push.

## License
MIT © Alex Wictor
