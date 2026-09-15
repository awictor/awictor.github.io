# WordFreq

**Word frequency counter** — paste text to see the most common words with counts (and a bar for each), total and unique word counts, plus options to ignore case and skip common stopwords. One offline HTML file, no signup, no tracking.

👉 **[Open WordFreq](https://awictor.github.io/word-freq/)**

## Features
- Ranked word list (count desc, then alphabetical) with visual bars
- Total and unique word counts
- Ignore case; ignore common stopwords (the, and, of, …)
- Live as you type; dark mode; remembers input and options
- 100% client-side; works offline

## Why
Writers, editors, and SEO folks check word frequency to catch overused words and spot keywords. WordFreq does it instantly and privately, no upload. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `countFrequency`, `stats`) are covered by headless regression tests: tokenization, count/alpha sorting, stopword and case options, and the sum-of-counts-equals-total invariant; CI runs them on every push.

## License
MIT © Alex Wictor
