# Alliteration Finder

Find **alliteration** in your writing — runs of nearby words that begin with the same letter. Great for poems, headlines, brand names and tongue-twisters. One offline HTML file, no signup, no tracking.

👉 **[Open Alliteration Finder](https://awictor.github.io/alliteration/)**

## What it does
Groups consecutive words sharing a first letter into runs. Raise the minimum run length to show only stronger alliteration; "skip small words" ignores the/a/of so they don't break a run. Matches by letter (not phonetics).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `firstLetter`, `findAlliterations`) are covered by headless tests — tokenization, initial-letter extraction, basic runs, min-run filtering, small-word skipping, run-breaking, multiple runs, case-insensitivity, the no-alliteration case, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
