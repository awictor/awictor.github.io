# Gematria Calculator

**English gematria letter-value sums.** Type a word or phrase and see three classic values: ordinal (A=1 … Z=26), reduction (Pythagorean 1–9), and reverse ordinal. A fun tool for word games, puzzles, and numerology. One offline HTML file, no signup, no tracking.

👉 **[Open Gematria Calculator](https://awictor.github.io/gematria/)**

## Ciphers
- **Ordinal** — A=1, B=2, … Z=26
- **Reduction (Pythagorean)** — each letter collapsed to 1–9
- **Reverse** — A=26, B=25, … Z=1

Only letters count; case and punctuation are ignored.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`letterValue`, `gematria`) are covered by headless tests — ordinal/reverse/reduction letter values, word sums, case-insensitivity, punctuation handling, empty input, and the ordinal+reverse=27 identity. CI runs them on every push.

## License
MIT © Alex Wictor
