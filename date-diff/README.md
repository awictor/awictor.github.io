# DateDiff

**Date duration calculator** — count the days between two dates, get the years/months/days breakdown, and add or subtract days from a date (with the resulting weekday). One offline HTML file, no signup, no tracking.

👉 **[Open DateDiff](https://awictor.github.io/date-diff/)**

## Features
- Exact days between two dates (leap-year aware)
- Calendar years / months / days breakdown, plus weeks
- Add or subtract days from a date; shows the weekday
- All math in UTC for consistent day counts
- Dark mode, remembers your dates
- 100% client-side; works offline

## Why
"How many days until…" and "what date is 90 days out" come up constantly. DateDiff answers both, precisely and locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`daysBetween`, `addDays`, `dayOfWeek`, `diffParts`) are covered by headless regression tests, including leap years and month rollovers; CI runs them on every push.

## License
MIT © Alex Wictor
