# CronPal

**Cron expression explainer** — paste a cron schedule and read it in plain English, plus a preview of the next run times. One offline HTML file, no signup, no tracking.

👉 **[Open CronPal](https://awictor.github.io/cron-pal/)**

## Features
- Plain-English description of standard 5-field cron expressions
- Next 5 run times (UTC), with relative "in X" hints
- Full syntax: `*`, `*/n`, ranges `a-b`, steps `a-b/n`, lists `a,b,c`, month/weekday names (`JAN`, `MON`), and `@macros` (`@daily`, `@hourly`, …)
- Correct day-of-month **OR** day-of-week semantics (Vixie cron) when both are restricted
- `7` accepted as Sunday; live validation
- Example chips, dark mode, remembers your last expression
- 100% client-side; works offline

## Why
Cron syntax is easy to misread and costly to get wrong. CronPal turns any expression into a sentence and shows exactly when it will fire next — no guessing, no server. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseField`, `parseCron`, `describeCron`, `nextRuns`) are covered by headless regression tests, including next-run math and Vixie DOM/DOW semantics; CI runs them on every push.

## License
MIT © Alex Wictor
