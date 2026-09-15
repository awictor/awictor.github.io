# LoremGen

**Lorem Ipsum generator** — placeholder text by words, sentences, or paragraphs, with the classic “Lorem ipsum…” opening. One offline HTML file, no signup, no tracking.

👉 **[Open LoremGen](https://awictor.github.io/lorem-gen/)**

## Features
- Generate by paragraphs, sentences, or words
- Optional classic "Lorem ipsum dolor sit amet…" opening
- One-tap copy
- Dark mode, remembers your settings
- 100% client-side; works offline

## Why
Designers and developers need filler text constantly for mockups and templates. LoremGen makes it in a tap, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`words`, `sentence`, `paragraph`, `generate`) take an injectable RNG and are covered by deterministic headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
