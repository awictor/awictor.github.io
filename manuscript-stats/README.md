# Manuscript Stats

Paste your writing (or type a word count) to get **standard manuscript pages**, the **SFWA length category** (flash fiction, short story, novelette, novella, novel), and **reading & speaking time**. Built for writers and editors. One offline HTML file, no signup, no tracking.

👉 **[Open Manuscript Stats](https://awictor.github.io/manuscript-stats/)**

## The definitions
- Standard manuscript page = **250 words**.
- SFWA lengths: flash < 1,000 · short story 1,000–7,499 · novelette 7,500–17,499 · novella 17,500–39,999 · novel 40,000+.
- Reading ~238 wpm (silent adult); speaking ~130 wpm.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`countWords`, `manuscriptPages`, `readingTime`, `speakingTime`, `category`) are covered by headless tests — word counting, page rounding (incl. custom words/page), the reading/speaking formulas and their linearity, the SFWA category boundaries, monotonicity, the zero case, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
