# SaveGoal

**Savings goal calculator** — enter a target, what you've saved so far, a timeframe, and an optional return, and it tells you how much to set aside each month to get there. One offline HTML file, no signup, no tracking.

👉 **[Open SaveGoal](https://awictor.github.io/save-goal/)**

## Features
- Solves for the **monthly contribution** to reach a goal by a date
- Accounts for existing savings and optional interest (monthly compounding)
- Tells you when you're already on track
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Most savings tools show what a monthly amount grows into; SaveGoal works backwards from your goal to the monthly number you actually need. A companion to [NestEgg](https://awictor.github.io/nest-egg/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `requiredMonthly` function is covered by headless regression tests against the annuity formula and edge cases; CI runs them on every push.

## License
MIT © Alex Wictor
