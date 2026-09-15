# Word Echo Finder

Find the words you repeat **too close together** — the unintentional echoes that make prose feel clumsy. A self-editing tool with an adjustable window and stop-word filtering. One offline HTML file, no signup, no tracking.

👉 **[Open Word Echo Finder](https://awictor.github.io/word-echo/)**

## What it does
Scans your text and flags any word that reappears within N words of itself (length ≥ a minimum, optionally skipping common words like "the"). Widen the window to catch echoes further apart.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tokenize`, `findEchoes`, `echoWordCount`) are covered by headless tests — tokenization/indexing, in-window detection, out-of-window exclusion, min-length filtering, stop-word handling, distance reporting, chained repeats, distinct-word counting, the clean-text case, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
