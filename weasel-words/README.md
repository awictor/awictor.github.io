# WeaselWords

**Weasel & filler word detector** — paste your writing and see every vague qualifier and filler intensifier (very, really, quite, basically, several…) highlighted, with a count and density score. One offline HTML file, no signup, no tracking.

👉 **[Open WeaselWords](https://awictor.github.io/weasel-words/)**

## Features
- Flags 40+ common weasel words and intensifiers, whole-word and case-insensitive
- Inline highlighting plus a per-word tally sorted by frequency
- Word count and weasel-word density
- Dark mode; 100% client-side

## Why
Words like "very," "basically," and "quite" pad sentences without adding meaning. WeaselWords surfaces them so you can cut the filler and tighten your prose, all offline. Pairs well with [PassiveVoice](https://awictor.github.io/passive-voice/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Note
This is a word-list heuristic — sometimes a "very" earns its place. Treat the highlights as candidates, not commands.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isWeasel`, `analyze`, `tally`) are covered by headless tests — single and multiple detections, case/punctuation handling, whole-word matching (no substring false positives), density, index alignment, frequency tally, and empty input. CI runs them on every push.

## License
MIT © Alex Wictor
