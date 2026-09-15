# TextGradient

**Gradient text CSS generator** — build multi-stop gradient text (a `linear-gradient` clipped to the text) with an angle control, live preview, and copy-ready cross-browser CSS. One offline HTML file, no signup, no tracking.

👉 **[Open TextGradient](https://awictor.github.io/text-gradient/)**

## Features
- 2–6 color stops with an angle slider
- Live preview on your own text
- Emits the full recipe: `background`, `-webkit-background-clip: text`, `background-clip: text`, and transparent fill
- Copy-ready CSS; dark mode; 100% client-side

## Why
Gradient text needs a specific four-line incantation that's easy to get wrong (the `-webkit-` prefix and transparent fill trip people up). TextGradient assembles it correctly and previews it live, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isHex`, `textGradientCss`) are covered by headless tests — gradient composition, the clip/transparent lines, multi-stop and default handling, the two-color minimum, invalid-hex rejection, and arbitrary angles. CI runs them on every push.

## License
MIT © Alex Wictor
