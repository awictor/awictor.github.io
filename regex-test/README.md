# RegexTest

**Live regular-expression tester** — type a pattern and see highlighted matches, capture groups, and a match count against your test string, with flag toggles and clear error messages. Uses the JavaScript regex engine. One offline HTML file, no signup, no tracking.

👉 **[Open RegexTest](https://awictor.github.io/regex-test/)**

## Features
- Live highlighted matches over your test text
- Capture groups per match; total match count
- Flag toggles: `g`, `i`, `m`, `s` (and free-form flag input)
- Clear "invalid pattern" errors; safe against zero-length-match loops
- Dark mode, remembers your pattern and text
- 100% client-side; works offline

## Why
Building a regex is iterative, and online testers send your (often sensitive) text to a server. RegexTest runs entirely in your browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `runRegex` function is covered by headless regression tests, including capture groups, invalid patterns, and zero-length-match handling; CI runs them on every push.

## License
MIT © Alex Wictor
