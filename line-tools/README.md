# LineTools

**Line sorter & cleaner** — sort lines A–Z, Z–A, or numerically; remove duplicates and blank lines; trim, reverse, and number lines. One offline HTML file, no signup, no tracking.

👉 **[Open LineTools](https://awictor.github.io/line-tools/)**

## Features
- Sort A→Z, Z→A, or numerically
- Remove duplicate lines (keeps first occurrence, order preserved)
- Remove blank lines, trim whitespace, reverse order, number lines
- Copy result or feed it back as input for chaining
- Dark mode, remembers your text
- 100% client-side; works offline

## Why
Cleaning up lists — imports, CSV columns, config lines — is a constant chore, and pasting them into an online tool leaks them. LineTools does it locally, one click each. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sortLines`, `dedupe`, `removeBlank`, `trimLines`, `reverseLines`, `numberLines`, `apply`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
