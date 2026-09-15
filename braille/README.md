# Braille

**Text ⇄ Braille (Grade 1) translator** — convert text to Unicode Braille with capital and number signs, and decode Braille back to text. One offline HTML file, no signup, no tracking.

👉 **[Open Braille](https://awictor.github.io/braille/)**

## Features
- Grade 1 (uncontracted) English Braille: letters, digits, common punctuation
- Capital sign (⠠) before uppercase; number sign (⠼) for digit runs (1–0 reuse a–j)
- Decodes Braille back to text, tracking capital/number state
- Dark mode; 100% client-side

## Why
Unicode Braille (U+2800 block) lets you produce and read Braille anywhere. Braille translates both ways offline — handy for accessibility, education, and labeling. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Note
This is Grade 1 (letter-for-letter). Grade 2 contractions are out of scope.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toBraille`, `fromBraille`) are covered by headless tests — letter patterns, the capital and number signs, space handling, punctuation, decoding, full round-trips with mixed content, and unmapped-character passthrough. CI runs them on every push.

## License
MIT © Alex Wictor
