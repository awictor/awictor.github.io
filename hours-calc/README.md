# HoursCalc

**Work hours & timesheet calculator** — enter clock-in and clock-out times, subtract a break, and get total hours in decimal and h:m, plus optional gross pay. Overnight shifts are handled automatically. One offline HTML file, no signup, no tracking.

👉 **[Open HoursCalc](https://awictor.github.io/hours-calc/)**

## Features
- Total worked time in decimal hours **and** h:m
- Subtracts an unpaid break; optional pay rate → gross pay
- Accepts `9:00 AM`, `17:30`, or `9am`
- Overnight shifts (clock-out before clock-in) computed correctly
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Every hourly worker and small-business owner does the same mental math each shift: in, out, minus lunch, times the rate. HoursCalc does it instantly and offline, with no login. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseTime`, `durationMinutes`, `workedMinutes`, `minutesToDecimal`, `minutesToHM`, `payFor`) are covered by headless regression tests, including 12h/24h parsing, overnight wrap, and break flooring; CI runs them on every push.

## License
MIT © Alex Wictor
