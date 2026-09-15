# FindReplace

**Bulk find & replace with regex** — paste text and replace with plain strings or full regular expressions, with capture-group backreferences, whole-word and case-insensitive options, and a live match count. One offline HTML file, no signup, no tracking.

👉 **[Open FindReplace](https://awictor.github.io/find-replace/)**

## Features
- Plain (literal) or regex find; `$1`/`$2` backreferences in regex mode
- Ignore-case and whole-word toggles
- Live match count; invalid regex is flagged, not applied
- Literal mode inserts the replacement verbatim (no `$` surprises)
- One-click copy, dark mode, remembers everything
- 100% client-side; works offline — your text never leaves the page

## Why
Editors and online replacers either lack regex or send your text to a server. FindReplace does powerful, safe replacements locally and shows exactly how many matches changed. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`escapeRegex`, `buildRegex`, `countMatches`, `replaceAll`) are covered by headless regression tests: literal vs regex, group backreferences, flags, whole-word, invalid-regex handling, and literal `$` insertion. CI runs them on every push.

## License
MIT © Alex Wictor
