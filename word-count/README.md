# WordCount

**Word & character counter with reading time** — counts words, characters, sentences, and paragraphs live as you type, plus reading/speaking time and top keywords. One offline HTML file, no signup, no tracking.

👉 **[Open WordCount](https://awictor.github.io/word-count/)**

## Features
- Live word, character (with/without spaces), sentence, and paragraph counts
- Reading time (200 wpm) and speaking time (130 wpm)
- Average word length
- Top keyword density (stopwords excluded)
- Dark mode, remembers your text locally
- 100% client-side; works offline — nothing leaves your device

## Why
Students, writers, and SEO folks count words constantly, and most online counters upload your draft to do it. WordCount runs entirely in your browser, so your writing stays private. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`words`, `textStats`, `keywordDensity`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
