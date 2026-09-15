# Scrabble Score

Score any word with **standard English Scrabble tile values** and see the per-letter breakdown on tile graphics. One offline HTML file, no signup, no tracking.

👉 **[Open Scrabble Score](https://awictor.github.io/scrabble-score/)**

## Values
1: A E I O U L N S T R · 2: D G · 3: B C M P · 4: F H V W Y · 5: K · 8: J X · 10: Q Z

Premium squares and the 50-point bingo bonus depend on the board, so they aren't included in the base score.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`letterScore`, `wordScore`, `breakdown`, `LETTER_VALUES`) are covered by headless tests: full 26-letter coverage, specific tile values, case-insensitivity, non-letter handling, the QUIZ=22 / HELLO=8 / SCRABBLE=14 vectors, breakdown-sums-to-score, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
