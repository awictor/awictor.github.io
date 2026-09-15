# HexAlpha

**Opacity ⇄ hex alpha converter** — turn an opacity percentage into the 8-bit alpha byte for `#RRGGBBAA`, build the matching `rgba()`, and read opacity back from a hex alpha. Live checkerboard swatch, one-click copy. One offline HTML file, no signup, no tracking.

👉 **[Open HexAlpha](https://awictor.github.io/hex-alpha/)**

## Features
- Opacity % → 2-digit hex alpha and full `#RRGGBBAA`
- `rgba()` output and the standalone alpha byte
- Hex alpha → opacity %; color picker + opacity slider
- Checkerboard transparency preview; dark mode; 100% client-side

## Why
`#RRGGBBAA` is now valid CSS, but translating "40% opacity" to the right two hex digits (`66`) is fiddly. HexAlpha does it both ways offline, with a live preview over a transparency grid. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`opacityToHex`, `hexToOpacity`, `normalizeHex6`, `withAlpha`, `toRgba`) are covered by headless tests — endpoints and rounded midpoints, the reverse mapping, round-trips, shorthand/# handling, `#RRGGBBAA` and `rgba()` output, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
