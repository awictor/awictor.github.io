# WeightGoal

**Weight-loss timeline & calorie deficit calculator** — enter your current and goal weight and a weekly rate to see how many weeks it'll take, the target date, and the daily calorie change needed. Works in kg or lb. One offline HTML file, no signup, no tracking.

👉 **[Open WeightGoal](https://awictor.github.io/weight-goal/)**

> ⚠️ Rough estimates — not medical or dietary advice.

## Features
- Weeks to goal and projected target date from a weekly rate
- Implied daily calorie deficit/surplus (7700 kcal/kg · 3500 kcal/lb)
- Works for losing or gaining; kg/lb toggle
- Dark mode; 100% client-side

## Why
"Lose 8 kg" is a goal; "0.5 kg/week means 16 weeks and a ~550 kcal daily deficit" is a plan. WeightGoal turns the target into a timeline and a number you can act on, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`weeksToGoal`, `dailyDeficit`, `weeklyRateFromDeficit`, `projectDate`) are covered by headless tests — loss/gain symmetry, the kcal-per-unit constants, deficit ↔ rate inversion, unit validation, date projection, and rate monotonicity. CI runs them on every push.

## License
MIT © Alex Wictor
