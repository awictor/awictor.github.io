# Keyword Density

**SEO keyword density & phrase analyzer.** Paste your copy and see the most frequent words and 2/3-word phrases (n-grams) with counts and density percentages — with optional stop-word filtering. One offline HTML file, no signup, no tracking.

👉 **[Open Keyword Density](https://awictor.github.io/keyword-density/)**

## Features
- 1, 2, and 3-word phrase (n-gram) frequency
- Count + density % (share of n-gram positions), with a bar chart
- Stop-word filtering for single words (the, and, of, …)
- Total / unique word stats
- Dark mode; 100% client-side

## Why
Content writers and SEOs check how often target terms appear to avoid keyword stuffing and spot missed phrases. This runs entirely in your browser — paste sensitive drafts safely.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `ngrams`, `density`) are covered by headless tests — tokenization and contractions, sliding-window n-grams, single/bigram density math, count-then-alphabetical sorting, stop-word filtering (1-gram only), and case-insensitive counting. CI runs them on every push.

## License
MIT © Alex Wictor
