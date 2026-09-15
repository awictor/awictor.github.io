# RaiseCalc

**Salary raise & real raise calculator** — compute a raise amount and new salary, and whether it actually beats inflation (the real, inflation-adjusted raise). One offline HTML file, no signup, no tracking.

👉 **[Open RaiseCalc](https://awictor.github.io/raise-calc/)**

## Features
- Raise amount and new salary from a percentage
- **Real raise**: `((1 + raise) / (1 + inflation) − 1)` — beats/matches/trails inflation
- New salary in today's dollars; clear verdict
- Dark mode; 100% client-side

## Why
A "4% raise" during 5% inflation is actually a pay cut in buying power. RaiseCalc shows the nominal numbers and the real, inflation-adjusted raise so you know where you really stand, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not financial advice
A simplified model — taxes, bracket changes, and personal inflation vary.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`raiseAmount`, `newSalary`, `pctFromNew`, `realRaisePct`, `realNewSalary`) are covered by headless tests — amounts, the percent inverse, the Fisher real-raise (beats/flat/trails), today's-dollars value, monotonicity in raise and inflation, zero raise, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
