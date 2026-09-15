# MorseCode

**Text ↔ Morse code translator** — type text to get Morse, or type Morse to get text, live and both directions. Letters, numbers, and common punctuation. One offline HTML file, no signup, no tracking.

👉 **[Open MorseCode](https://awictor.github.io/morse-code/)**

## Features
- Text → Morse and Morse → text, live
- A–Z, 0–9, and punctuation (`. , ? ! / ( ) & : ; = + - _ " @`)
- Space between letters, `/` between words
- Copy either side; dark mode; remembers your text
- 100% client-side; works offline

## Why
A tiny, delightful translator for learning, puzzles, and signalling — offline and instant. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`textToMorse`, `morseToText`) are covered by headless regression tests, including round-trips and punctuation; CI runs them on every push.

## License
MIT © Alex Wictor
