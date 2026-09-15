# Phonetic

**NATO phonetic alphabet speller** — turn any text into *Alfa Bravo Charlie* for spelling names, confirmation codes, and passwords over the phone, and decode phonetic words back into text. One offline HTML file, no signup, no tracking.

👉 **[Open Phonetic](https://awictor.github.io/nato-phonetic/)**

## Features
- Text → phonetic and phonetic → text, both directions
- Uses the official ICAO/NATO spellings (**Alfa**, **Juliett**, **X-ray**) with digit words
- Decoding is case-insensitive and accepts common variants ("Alpha", "Juliet", aviation "Niner/Tree/Fife/Fower")
- Built-in reference chart, one-tap copy, dark mode, remembers your input
- 100% client-side; works offline

## Why
"Was that a B or a D?" Spelling a code over a bad phone line is painful. Phonetic converts your text instantly and reads back cleanly — and decodes what someone else spelled to you. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`charToWord`, `toNato`, `fromNato`, `NATO`, `DIGITS`) are covered by headless tests, including a full A–Z / 0–9 round-trip and alias decoding; CI runs them on every push.

## License
MIT © Alex Wictor
