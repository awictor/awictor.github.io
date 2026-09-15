# TextShadowGen

**CSS text-shadow generator** — stack multiple text-shadow layers with a live text preview, then copy the `text-shadow:` CSS. One offline HTML file, no signup, no tracking.

👉 **[Open TextShadowGen](https://awictor.github.io/text-shadow-gen/)**

## Features
- Unlimited stacked shadow layers (X/Y offset, blur, color)
- Live preview on editable sample text — great for glows and outlines
- Copy-ready CSS; dark mode; remembers your work
- 100% client-side; works offline

## Why
Text shadows do glows, embossing, and outlines — but you often need several layers, and hand-writing them is fiddly. TextShadowGen previews the effect live and outputs clean CSS. (For box shadows, see the sibling [ShadowGen](https://awictor.github.io/shadow-gen/).) Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`px`, `textShadowLayer`, `textShadow`, `withProperty`) are covered by headless tests with exact-string assertions, defaults, and multi-layer joins; CI runs them on every push.

## License
MIT © Alex Wictor
