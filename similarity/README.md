# Similarity

**String similarity & edit distance** — compare two strings with Levenshtein edit distance, a similarity ratio, the Sørensen–Dice coefficient (character bigrams), and Hamming distance. One offline HTML file, no signup, no tracking.

👉 **[Open Similarity](https://awictor.github.io/similarity/)**

## Features
- Levenshtein distance and similarity % with a visual bar
- Sørensen–Dice coefficient (bigram overlap)
- Hamming distance for equal-length strings
- Live as you type; dark mode; remembers your input
- 100% client-side; works offline

## Why
Fuzzy matching, deduping records, spell-check scoring, and diff tooling all rest on these metrics. Similarity computes them instantly and offline, with no data leaving your browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`levenshtein`, `similarityRatio`, `bigrams`, `diceCoefficient`, `hamming`) are covered by headless regression tests against classic known values (kitten/sitting = 3, night/nacht Dice = 0.25, karolin/kathrin Hamming = 3); CI runs them on every push.

## License
MIT © Alex Wictor
