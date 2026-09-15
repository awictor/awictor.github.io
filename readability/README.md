# Readability

**Reading level & readability scores** — get Flesch Reading Ease, Flesch-Kincaid Grade, and the Automated Readability Index for any text, with word, sentence, and syllable counts. One offline HTML file, no signup, no tracking.

👉 **[Open Readability](https://awictor.github.io/readability/)**

## Features
- Flesch Reading Ease (with a plain-language label) + FK Grade + ARI
- Word, sentence, syllable, and character counts
- Live as you type; dark mode; remembers your text
- 100% client-side; works offline — nothing uploaded

## Why
Writers, teachers, and content teams target a reading level; these indices estimate it. Readability computes the standard formulas instantly and privately. Syllables use a heuristic, so treat scores as approximate. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`syllables`, `countWords`, `countSentences`, `analyze`, `easeLabel`) are covered by headless regression tests, including hand-verified Flesch/FK/ARI values for a known sentence and monotonicity (harder text scores lower ease); CI runs them on every push.

## License
MIT © Alex Wictor
