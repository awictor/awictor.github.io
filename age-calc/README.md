# AgeCalc

**Age calculator** — enter a date of birth to get your exact age (years, months, days), total days/weeks/months/hours lived, and a countdown to your next birthday. One offline HTML file, no signup, no tracking.

👉 **[Open AgeCalc](https://awictor.github.io/age-calc/)**

## Features
- Exact age in years, months, and days
- Totals: days, weeks, months, hours lived
- Next-birthday date and days-until countdown ("Happy birthday!" on the day)
- Dark mode, remembers your date
- 100% client-side; works offline

## Why
"How old exactly?" and "how long until my birthday?" are quick questions that shouldn't need a server. AgeCalc answers both, in UTC for consistency. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ageParts`, `totalDays`, `nextBirthday`) take an injectable "today" and are covered by deterministic headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
