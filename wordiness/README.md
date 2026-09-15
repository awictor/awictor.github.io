# Wordiness Reducer

**Omit needless words.** Paste your writing and see wordy, redundant phrases flagged with concise replacements — then tighten the whole thing with one click. One offline HTML file, no signup, no tracking.

👉 **[Open Wordiness Reducer](https://awictor.github.io/wordiness/)**

## Examples
- "due to the fact that" → **because**
- "in order to" → **to**
- "at this point in time" → **now**
- "a large number of" → **many**
- "utilize" → **use**

## Features
- 35+ common wordiness rules with concise alternatives
- Inline highlighting + a suggestions table with counts
- One-click "tighten & copy" that preserves capitalization
- Longer phrases take priority over shorter overlaps
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`findWordy`, `tighten`, `summarize`) are covered by headless tests — matching, case-insensitivity, replacement, capitalization preservation, overlap priority, word boundaries, multi-space handling, and counts. CI runs them on every push.

## License
MIT © Alex Wictor
