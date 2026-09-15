# Anagram

**Anagram checker & finder** — check whether two phrases are anagrams, see their letter signature, and find which words in a list are anagrams of your input. Ignores case, spaces, and punctuation. One offline HTML file, no signup, no tracking.

👉 **[Open Anagram](https://awictor.github.io/anagram/)**

## Features
- Yes/no anagram check for two phrases, with the sorted-letter signature
- Find-anagrams: filter a candidate list for matches of a word
- Case/space/punctuation-insensitive (letters & digits)
- Dark mode; 100% client-side

## Why
Anagrams power word games, puzzles, and playful branding ("Dormitory" = "Dirty Room"). Anagram checks and finds them instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`signature`, `isAnagram`, `findAnagrams`) are covered by headless tests — signature sorting, classic anagrams, case/space/punctuation handling, non-anagrams, self-anagrams, digits, empty input, list finding, and idempotence. CI runs them on every push.

## License
MIT © Alex Wictor
