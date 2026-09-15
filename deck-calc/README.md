# Deck Board Calculator

Estimate the **deck boards, rows and linear feet** for a deck from its dimensions, board width and gap — with a waste allowance. One offline HTML file, no signup, no tracking.

👉 **[Open Deck Board Calculator](https://awictor.github.io/deck-calc/)**

## How it estimates
Rows across = deck width ÷ (board width + gap), rounded up. Linear feet = rows × deck length. Boards = linear feet ÷ stock board length, rounded up, plus a waste allowance (~10%).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`rowsAcross`, `linearFeet`, `boardsNeeded`, `withWaste`) are covered by headless tests — row rounding, linear-feet, board rounding, the waste allowance, width/gap/length monotonicity, an end-to-end example, the zero-width case, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
