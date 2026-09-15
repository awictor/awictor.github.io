# RandomPick

**Randomizer** — generate a random number in a range, roll dice, or pick and shuffle items from a list. One offline HTML file, no signup, no tracking.

👉 **[Open RandomPick](https://awictor.github.io/random-pick/)**

## Features
- Random integer in any range (handles reversed ranges)
- Dice roller (any sides, any count) with sum
- Pick one from a list, or shuffle the whole list
- Dark mode, remembers your list
- 100% client-side; works offline

## Why
Draw a name, settle a decision, roll for a game — RandomPick does it instantly and locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`randInt`, `pick`, `shuffle`, `pickN`, `rollDice`) take an injectable RNG and are covered by deterministic headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
