# DiffCheck

**Text & code diff checker** — compare two texts line by line and see exactly what was added, removed, or unchanged, with counts. One offline HTML file, no signup, no tracking; your text never leaves your device.

👉 **[Open DiffCheck](https://awictor.github.io/diff-check/)**

## Features
- Line-level diff using a proper LCS algorithm (not naive line-by-line)
- Color-coded output: additions, deletions, unchanged
- Added / removed / unchanged counts
- Dark mode, remembers both inputs
- 100% client-side; works offline

## Why
Comparing config, code, or copy is constant, and pasting into an online diff tool leaks it. DiffCheck computes the diff locally with a real longest-common-subsequence pass, so the result is minimal and accurate. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`diffLines`, `diffStats`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
