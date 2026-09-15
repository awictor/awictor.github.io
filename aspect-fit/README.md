# Aspect Fit

Compute the scaled size of content fitted into a box with **contain** (fit inside, letterbox) or **cover** (fill and crop) — exactly the CSS `object-fit` rules — plus the scale factor. One offline HTML file, no signup, no tracking.

👉 **[Open Aspect Fit](https://awictor.github.io/aspect-fit/)**

## How it works
`contain` scale = min(box/content) in each axis; `cover` scale = max. Aspect ratio is always preserved.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`contain`, `cover`) are covered by headless tests: 16:9-into-square vectors, contain-fits / cover-fills invariants, aspect-ratio preservation, exact-fit scale 1, portrait-into-landscape, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
