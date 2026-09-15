# Sentence Rhythm

Paste your writing and **see the rhythm of your sentences**. Great prose varies short, medium and long sentences; a wall of same-length sentences reads flat. This tool charts every sentence by word count, buckets them, and scores the variety. One offline HTML file, no signup, no tracking.

👉 **[Open Sentence Rhythm](https://awictor.github.io/sentence-rhythm/)**

## The variety score
It's the **coefficient of variation** (standard deviation ÷ mean) of your sentence lengths — higher means more varied rhythm. Inspired by Gary Provost's "this sentence has five words" passage on sentence variety.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`splitSentences`, `countWords`, `sentenceLengths`, `mean`, `stdev`, `varietyScore`, `classify`) are covered by headless tests — sentence splitting on `.!?`, word counting with contractions/hyphens, population standard deviation, the coefficient-of-variation score, the zero-variety case, bucket boundaries, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
