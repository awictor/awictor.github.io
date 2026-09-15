# DueDate

**Pregnancy due date calculator** — enter the first day of the last menstrual period to get the estimated due date (Naegele's rule), current gestational age, trimester, conception estimate, and days remaining. One offline HTML file, no signup, no tracking.

👉 **[Open DueDate](https://awictor.github.io/due-date/)**

## Features
- Estimated due date = LMP + 280 days (Naegele's rule)
- Gestational age in weeks + days (from today), trimester, days remaining
- Estimated conception date
- Dark mode, remembers your LMP
- 100% client-side; works offline

## Why
Every pregnancy starts with the same question — "when's it due?" DueDate answers it plus the surrounding milestones instantly and privately. An estimate, not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`addDays`, `daysBetween`, `dueDate`, `conceptionDate`, `gestationalAge`, `trimester`) are covered by headless regression tests: month/leap-year boundaries, the +280/+14 day rules, week/day breakdown, trimester cutoffs, and the "40 weeks = due date" invariant. UTC math with an injectable "today". CI runs them on every push.

## License
MIT © Alex Wictor
