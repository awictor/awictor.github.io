# Haiku

**Syllable counter & 5-7-5 validator** — type a poem and see the syllable count for each line, live, with an instant check of whether it's a valid 5-7-5 haiku. One offline HTML file, no signup, no tracking.

👉 **[Open Haiku](https://awictor.github.io/haiku/)**

## Features
- Per-line syllable counts, color-coded against the 5-7-5 target
- Live verdict: valid haiku or not yet
- Word and total-syllable stats
- English syllable heuristic (vowel-group counting with silent-e handling)
- Dark mode; 100% client-side

## Why
Writing a haiku means counting syllables over and over. Haiku does it as you type and tells you the moment your poem lands on 5-7-5, entirely offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`syllables`, `lineSyllables`, `wordCount`, `analyze`) are covered by headless tests — multi-syllable words, silent-e handling, short-word floor, punctuation stripping, line sums, and full haiku validation. CI runs them on every push.

## Note
Syllable counting uses a heuristic, so unusual words (e.g. "rhythm", "queue") can be off by one. It's tuned for the common vocabulary of short poems.

## License
MIT © Alex Wictor
