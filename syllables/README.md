# Syllables

**Syllable counter & haiku checker** — count syllables per word and per line, see the totals, and get an instant check on whether your poem is a 5-7-5 haiku. One offline HTML file, no signup, no tracking.

👉 **[Open Syllables](https://awictor.github.io/syllables/)**

## Features
- Per-line and total syllable counts as you type
- 5-7-5 haiku detector (ignores blank lines around the poem)
- Word and syllable totals; handles apostrophes
- Dark mode; 100% client-side

## Why
Poets, songwriters, and anyone writing to a meter need quick syllable counts, and haiku writers need the 5-7-5 check. Syllables does both live, offline. The counter uses a well-known English heuristic — excellent for haiku, though no rule nails every word.

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`syllables`, `words`, `countText`, `lineSyllables`, `isHaiku`) are covered by headless tests — short words, multi-syllable and silent-e cases, tokenization, per-line counts, and haiku acceptance/rejection with blank-line handling. CI runs them on every push.

## License
MIT © Alex Wictor
