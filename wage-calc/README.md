# WageCalc

**Salary ↔ hourly wage converter** — enter a wage as hourly, weekly, monthly, or yearly, set your hours per week and weeks per year, and see all four. One offline HTML file, no signup, no tracking.

👉 **[Open WageCalc](https://awictor.github.io/wage-calc/)**

## Features
- Convert from any period to yearly / monthly / weekly / hourly
- Adjustable hours per week and weeks per year
- Clean money-formatted breakdown
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
"What's that hourly rate as a salary?" (and back) comes up in job offers, freelancing, and budgeting. WageCalc converts instantly. (Gross pay, before tax.) Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`annualFrom`, `breakdownFromAnnual`) are covered by headless regression tests including round-trips and zero-guards; CI runs them on every push.

## License
MIT © Alex Wictor
