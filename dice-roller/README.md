# Dice Roller

Parse tabletop **dice notation** (`3d6+2`, `d20`, `2d8-1`, `2d6+1d4`) for its **min, average, and max**, and **roll** it with the per-die breakdown. One offline HTML file, no signup, no tracking.

👉 **[Open Dice Roller](https://awictor.github.io/dice-roller/)**

## Notation
`NdM` rolls N dice with M sides; leave N off for one die (`d20`); combine terms with + and − and add flat modifiers (`2d6+1d4-1`).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseTerms`, `parseDice`, `roll`) are covered by headless tests: the 3d6+2 stats, single-die default, multi-term sums, negative terms, flat numbers, deterministic min/max rolls via an injected RNG, a within-range property over 500 random rolls, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
