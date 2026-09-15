# Reading Time Estimator

Estimate **reading time** and **speaking time (aloud)** from any text, with word/character counts and an adjustable reading speed. The "X min read" badge every blog and CMS shows. One offline HTML file, no signup, no tracking.

👉 **[Open Reading Time Estimator](https://awictor.github.io/reading-time/)**

## How it works
`time = words ÷ speed`. Silent reading averages ~238 wpm (adjustable); reading aloud uses a slower ~130 wpm for timing speeches and video scripts.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`countWords`, `readingTime`, `speakingTime`, `humanize`) are covered by headless tests: word counting across whitespace, words÷wpm vectors, inverse speed scaling, the 238/130 wpm defaults, zero-word handling, duration formatting with 60-second rollover, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
