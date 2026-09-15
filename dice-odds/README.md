# DiceOdds

**Dice roll probability calculator** — set how many dice and how many sides, then see the full sum distribution, expected value, and the exact odds of rolling at least / at most / exactly a target. One offline HTML file, no signup, no tracking.

👉 **[Open DiceOdds](https://awictor.github.io/dice-odds/)**

## Features
- Exact probabilities (not simulated) for any `NdM` up to 20 dice
- Sum distribution bar chart with the matching outcomes highlighted
- Expected value, min, max, most-likely sum, and total outcome count
- At-least / at-most / exactly conditions; dark mode; 100% client-side

## Why
"What are the odds of rolling 9 or higher on 2d6?" is a common tabletop and stats question, and simulations only approximate it. DiceOdds computes the exact distribution by convolving the dice, so the numbers are correct to the last outcome. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`distribution`, `totalOutcomes`, `stats`, `probability`) are covered by headless tests — the triangular 2d6 shape, `sides^n` totals, the `n*(sides+1)/2` mean, complementary at-least/at-most odds, and clamped impossible/certain targets. CI runs them on every push.

## License
MIT © Alex Wictor
