# ColorName

**Find the nearest CSS color name for any hex** — enter a hex color and get the closest named CSS color (and the next nearest matches) by RGB distance, with an exact-match badge. One offline HTML file, no signup, no tracking.

👉 **[Open ColorName](https://awictor.github.io/color-name/)**

## Features
- Matches against ~140 named CSS colors by straight-line RGB distance
- Shows the best match plus the next few, each clickable to explore
- Exact-hex-match badge; color picker + hex input stay in sync
- Dark mode; remembers your input; 100% client-side; works offline

## Why
"What do I *call* `#4a90d9`?" — naming a color for a design token, a bug report, or a chat is surprisingly fiddly. ColorName gives you the closest CSS name instantly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`nearestColor`, `nearestList`, `hexToRgb`, `dist2`, `CSS_COLORS`) are covered by headless tests — exact matches, near matches, 3-digit hex, sorted results, and the color table's validity; CI runs them on every push.

## License
MIT © Alex Wictor
