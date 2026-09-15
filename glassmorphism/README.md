# Glass

**Glassmorphism (frosted glass) CSS generator** — tune the tint, opacity, blur, corner radius, and border to get the frosted-glass look, with a live preview over a colorful backdrop and copy-ready CSS. One offline HTML file, no signup, no tracking.

👉 **[Open Glass](https://awictor.github.io/glassmorphism/)**

## Features
- Tint color + opacity → the translucent `rgba()` background
- `backdrop-filter` blur (with `-webkit-` prefix), corner radius, and a subtle white border
- Live preview panel floating over a vivid gradient so you can judge the effect
- Copy-ready CSS; dark mode; 100% client-side

## Why
Glassmorphism looks great but is easy to get wrong — too much opacity kills the blur, too little makes text unreadable. Glass lets you dial it in visually and gives you correct, prefixed CSS to paste. Pairs with [Neumorph](https://awictor.github.io/neumorphism/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgba`, `glass`) are covered by headless tests — hex parsing, alpha clamping, the translucent background, both backdrop-filter prefixes, radius/border output, defaults, and invalid-color rejection. CI runs them on every push.

## License
MIT © Alex Wictor
