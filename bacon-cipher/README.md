# Bacon Cipher

**Encode and decode with the Baconian cipher.** Each letter becomes a group of five symbols drawn from two types (A/B by default). One offline HTML file, no signup, no tracking. Great for puzzles, escape rooms, and steganography.

👉 **[Open Bacon Cipher](https://awictor.github.io/bacon-cipher/)**

## How it works
Francis Bacon's 1605 cipher maps each letter to a 5-symbol binary pattern. This tool uses the modern 26-letter version so every letter is distinct (A = `aaaaa`, B = `aaaab` … Z = `bbaab`). Because it only needs a binary distinction, you can hide the two symbols in a cover text — two typefaces, upper/lowercase, roman vs italic — for true steganography. Pick any two symbols (a/b, 0/1, …).

## Features
- Encode / decode modes with custom two symbols
- Case-insensitive, ignores non-letters and formatting
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`charToGroup`, `groupToChar`, `encode`, `decode`) are covered by headless tests — the A/B/Z/H reference groups, full-alphabet inversion, 5-symbols-per-letter, case-insensitivity, non-letter handling, custom symbols, and incomplete-group handling. CI runs them on every push.

## License
MIT © Alex Wictor
