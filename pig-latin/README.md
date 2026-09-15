# PigLatin

**English → Pig Latin translator** — type text and get the Pig Latin instantly, with correct consonant-cluster, `qu`, and `y`-as-vowel handling, preserving capitalization and punctuation. One offline HTML file, no signup, no tracking.

👉 **[Open PigLatin](https://awictor.github.io/pig-latin/)**

## Features
- Vowel-initial words → `way`; otherwise the leading consonant cluster moves to the end + `ay`
- Handles `qu` as a unit (quick → ickquay) and `y` as a vowel except at the start (my → ymay)
- Preserves capitalization (Pig → Igpay, HELLO → ELLOHAY) and leaves punctuation/digits alone
- Dark mode; 100% client-side

## Why
Pig Latin is a classic word game and a neat little parsing exercise. PigLatin applies the rules consistently and offline — fun for kids, handy for demos. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`firstVowelIndex`, `translateWord`, `translate`) are covered by headless tests — single consonants, clusters, vowel-initial words, `qu`, `y`-as-vowel, no-vowel words, capitalization, and punctuation/whitespace preservation. CI runs them on every push.

## License
MIT © Alex Wictor
