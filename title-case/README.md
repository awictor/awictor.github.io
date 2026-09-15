# TitleCase

**Title case & text case converter** — convert text to proper Title Case (keeping small words like *a, of, the* lowercase unless first or last), plus Sentence case, UPPERCASE, and lowercase. One offline HTML file, no signup, no tracking.

👉 **[Open TitleCase](https://awictor.github.io/title-case/)**

## Features
- Title Case with AP-style small-word rules (first and last words always capitalized)
- Sentence case (capitalizes the start of each sentence)
- UPPERCASE and lowercase
- Copy result; dark mode; remembers your text
- 100% client-side; works offline

## Why
"Title Case" isn't just capitalizing every word — articles, conjunctions, and short prepositions stay lowercase. TitleCase applies those rules so your headlines look right. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`titleCase`, `sentenceCase`, `upperCase`, `lowerCase`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
