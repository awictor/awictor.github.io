# ClipPath

**CSS clip-path shape generator** — build `inset`, `circle`, `ellipse` and `polygon` clip-paths with a live preview and copy-ready CSS (with `-webkit-` prefix). Comes with shape presets: triangle, hexagon, star, chevron and more. One offline HTML file, no signup, no tracking.

👉 **[Open ClipPath](https://awictor.github.io/clip-path-gen/)**

## Features
- Four shape types with the right controls for each (radius, center, insets, corner round)
- Polygon presets (triangle, trapezoid, rhombus, pentagon, hexagon, chevron, star, message)
- Live preview updates as you drag; copy CSS with the `-webkit-` prefix included
- Dark mode; remembers your shape; 100% client-side; works offline

## Why
`clip-path` is one of the most expressive CSS properties and one of the most annoying to hand-write — especially polygons. ClipPath previews the shape live and hands you clean CSS. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`insetPath`, `circlePath`, `ellipsePath`, `polygonPath`, `withProperty`, `POLYGONS`) are covered by headless tests, including round handling and preset point validity; CI runs them on every push.

## License
MIT © Alex Wictor
