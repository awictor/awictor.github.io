# TextClean

**Clean up messy text** — trim line ends, collapse runs of spaces, remove blank lines, strip HTML tags, normalize line endings, and straighten smart quotes. Toggle exactly the operations you want. One offline HTML file, no signup, no tracking.

👉 **[Open TextClean](https://awictor.github.io/text-clean/)**

## Features
- Six independent operations, each toggleable
- Runs in a sensible order (normalize → strip HTML → straighten quotes → collapse spaces → trim → drop blanks)
- Live character-count before/after
- One-click copy; dark mode; remembers your input and settings
- 100% client-side; works offline

## Why
Text pasted from PDFs, emails, and web pages is full of smart quotes, trailing whitespace, doubled spaces, and stray markup. TextClean fixes all of it in one pass, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalizeNewlines`, `stripHtml`, `straightenQuotes`, `collapseSpaces`, `trimLines`, `removeBlankLines`, `clean`) are covered by headless regression tests with exact expected output and pipeline-ordering checks; CI runs them on every push.

## License
MIT © Alex Wictor
