# Fluidline

Draw the CSS `clamp()` line and watch your type scale — a fluid-typography calculator with a live viewport ruler, in one HTML file.

## Why it's cool

Fluid type via `clamp(min, preferred, max)` is something front-end devs write constantly, and converting two viewport/size pairs into the `vw + rem` preferred value is annoying algebra that's easy to get wrong. Fluidline does the math *and* shows the actual interpolation line, so you understand the curve instead of trusting a black box. It's a single file with zero dependencies and no network calls — save it, open it, done. Every input lives in the URL hash, so any configuration is a link you can bookmark or share.

## Features

- **Single-value mode** — enter a min/max viewport and a size at each, get a correct `clamp(minRem, Arem + Bvw, maxRem)` with the slope, vw-coefficient, and intercept shown. Handles the edge cases: equal viewports collapse to a fixed value (no divide-by-zero), and inverted sizes (min > max) emit a valid clamp with clean `A - Bvw` formatting.
- **Type-scale mode** — pick a base size and two modular ratios (Minor Third, Golden, etc.) and generate a stepped set of clamps across a configurable step range, each with its own copy button.
- **Interpolation chart** — an SVG plot of size vs. viewport width with the flat min/max shelves and the sloped fluid zone. Hover to read the exact size at any width; the coordinate space is sized to the real render box so nothing stretches on wide or narrow screens.
- **Live preview** — a resizable frame that acts as a simulated viewport. Drag its bottom-right corner or use the slider; the sample text (or a spacing demo for `gap`/`margin`/`padding`) reflows exactly the way `clamp()` will ship, and an orange marker tracks the width on the chart.
- **Multiple targets & formats** — target `font-size`, `margin`, `padding`, or `gap`; export as CSS custom properties, an SCSS map, or a Tailwind config block.
- **rem/px toggle** with a configurable root font-size; values convert in place.
- **Guardrails** — flags no-fluid-range inputs, over-aggressive growth ratios, and sub-12px readable floors.
- **Shareable state** — the full configuration is serialized to the URL hash; an empty hash loads sensible defaults.

## Run it

No build step, no install, no server required.

```
# macOS
open index.html
# Linux
xdg-open index.html
# Windows
start index.html
```

Or just double-click `index.html`, or drag it into any browser.

If you want to serve it (e.g. to share on a LAN), any static server works:

```
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

Copy-to-clipboard works over `file://` and `https://`, and falls back to a legacy copy path on plain `http://` where the async clipboard API is unavailable.

## Controls

- **Single value / Type scale** — switch calculator mode.
- **rem / px** — output unit; converts stored sizes in place.
- **root** — root font-size (px) used for rem conversion.
- **target** — which CSS property the output is for (`font-size`, `margin`, `padding`, `gap`).
- **Clamp from this window** — seed the min/max viewports from the current browser width.
- **Live preview** — drag the frame's bottom-right corner or the slider to sweep the viewport; edit the sample text inline.
- **copy** buttons — copy a single value, a scale step, or the whole export block.

## License

MIT — see [LICENSE](LICENSE).
