# IsoWeek

**ISO 8601 week number for any date** — find the ISO week and week-year (`2025-W01`), the weekday, and how many weeks are in that year. Handles the tricky year-boundary weeks correctly. One offline HTML file, no signup, no tracking.

👉 **[Open IsoWeek](https://awictor.github.io/iso-week/)**

## Features
- ISO 8601 week number + week-year in `YYYY-Www` form
- Weekday (Monday-first) and weeks-in-year (52 or 53)
- Correct handling of early-January / late-December boundary weeks
- Dark mode; 100% client-side

## Why
ISO week numbers drive European calendars, payroll, and sprint planning — and the year boundaries are subtle (2021-01-01 is actually week 53 of 2020). IsoWeek gets them right, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isoWeek`, `weekday`, `weeksInYear`, `format`) are covered by headless tests — week 1 starts, the 2020-W53 / 2025-W01 boundary cases, weekday numbering, 52-vs-53-week years, the Dec-28 rule, range bounds, formatting, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
