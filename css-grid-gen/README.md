# GridGen

**CSS Grid layout generator** — build `grid-template-columns` and `grid-template-rows` with a live preview, then copy clean CSS. Track syntax is validated as you type: `fr`, lengths, `auto`, `min/max-content`, and nested `minmax()` / `repeat()` all work. One offline HTML file, no signup, no tracking.

👉 **[Open GridGen](https://awictor.github.io/css-grid-gen/)**

## Features
- Live grid preview that updates as you edit columns, rows, gap and cell count
- Real track validation — invalid tokens are dropped and the field flags red
- Handles `repeat(auto-fill, minmax(160px, 1fr))` and other nested track functions
- One-tap presets (3 equal, repeat(4), sidebar, responsive, header/body/footer)
- Copy-ready CSS, dark mode, remembers your layout; 100% client-side; works offline

## Why
CSS Grid is powerful but the track syntax is fiddly, and it's easy to ship `repeat(3 1fr)` with a missing comma. GridGen previews the layout live and only emits valid, normalized CSS. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalizeTrackToken`, `parseTracks`, `splitTracks`, `buildTemplate`, `repeatTrack`, `gridCSS`) are covered by headless tests, including recursive `minmax()`/`repeat()` validation and full-rule output; CI runs them on every push.

## License
MIT © Alex Wictor
