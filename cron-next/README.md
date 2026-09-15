# CronNext

**Preview a cron expression's next runs** — enter a 5-field cron expression and see exactly when it will fire next, so you can sanity-check a schedule before deploying it. One offline HTML file, no signup, no tracking.

👉 **[Open CronNext](https://awictor.github.io/cron-next/)**

## Features
- Lists the next N run times (UTC) with a relative "in …" countdown
- Supports `*`, lists (`1,15`), ranges (`9-17`), and steps (`*/5`, `0-20/5`)
- Correct day-of-month **OR** day-of-week semantics when both are restricted
- Handy presets; validates and flags malformed expressions
- Dark mode; remembers your input; 100% client-side; works offline

## Why
A describer tells you what a cron *means*; CronNext shows you what it will actually *do* — the real timestamps — which is how you catch an off-by-one weekday or a schedule that never fires. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseField`, `parseCron`, `matches`, `nextRuns`) are covered by headless tests against fixed UTC reference dates — step/range/list parsing, weekday-7 normalization, DOM/DOW OR behavior, and exact next-run timestamps; CI runs them on every push.

## License
MIT © Alex Wictor
