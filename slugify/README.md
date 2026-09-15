# Slugify

**URL slug generator** — turn any title into a clean, URL-safe slug: lowercased, accent-stripped, hyphenated, with a choice of separator and an optional max length. One offline HTML file, no signup, no tracking.

👉 **[Open Slugify](https://awictor.github.io/slugify/)**

## Features
- Strips accents (`Café` → `cafe`) and non-alphanumerics
- Collapses runs of separators; trims leading/trailing ones
- Choose `-` or `_`; optional max length (trims cleanly)
- Click to copy; dark mode; remembers your input
- 100% client-side; works offline

## Why
CMS and blog URLs need clean slugs, and doing it by hand is error-prone. Slugify handles accents, punctuation, and length in one step. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `slugify` function is covered by headless regression tests, including accent-stripping, separators, and max-length trimming; CI runs them on every push.

## License
MIT © Alex Wictor
