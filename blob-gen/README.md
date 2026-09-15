# Blob

**CSS blob shape generator** — make organic, asymmetric "blob" shapes with the CSS `border-radius` two-axis trick. Randomize for inspiration, fine-tune each of the eight corners, set size and color, and copy the code. One offline HTML file, no signup, no tracking.

👉 **[Open Blob](https://awictor.github.io/blob-gen/)**

## Features
- One-click randomize plus eight per-corner sliders for full control
- Live preview; size and color controls
- Copy-ready `border-radius` shorthand (`a% b% c% d% / e% f% g% h%`)
- Dark mode; 100% client-side

## Why
Organic blobs are everywhere in modern UI, but hand-writing the eight-value `border-radius` shorthand is fiddly. Blob lets you dial one in visually — or roll the dice — and gives you clean CSS. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`blobRadius`, `randomBlob`, `blobCss`) are covered by headless tests — shorthand assembly, numeric-string input, length and range validation, deterministic randomization from an injected RNG, the 25–75% band, and CSS composition with defaults. CI runs them on every push.

## License
MIT © Alex Wictor
