# Scrollbar

**Custom CSS scrollbar generator** — set the width, track/thumb/hover colors, and thumb radius, watch a live scrollable preview, and copy cross-browser CSS (WebKit `::-webkit-scrollbar` + Firefox `scrollbar-color`). One offline HTML file, no signup, no tracking.

👉 **[Open Scrollbar](https://awictor.github.io/scrollbar/)**

## Features
- Width, thumb radius, and track / thumb / hover colors
- Live preview you can actually scroll
- Emits both WebKit pseudo-elements and Firefox `scrollbar-width` / `scrollbar-color`
- Copy-ready CSS; dark mode; 100% client-side

## Why
Custom scrollbars need two different syntaxes (WebKit vs Firefox) and are annoying to preview. Scrollbar shows the result live and gives you correct CSS for both, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isHex`, `scrollbarCss`) are covered by headless tests — value composition, the Firefox `scrollbar-color` ordering, hover defaulting to thumb, defaults, 3-digit hex, and rejection of invalid colors / negative sizes. CI runs them on every push.

## License
MIT © Alex Wictor
