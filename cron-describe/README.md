# CronDescribe

**Cron expression → plain English** — paste a 5-field cron expression and get a readable description of when it runs. One offline HTML file, no signup, no tracking.

👉 **[Open CronDescribe](https://awictor.github.io/cron-describe/)**

## Features
- Handles the common patterns: `*`, `*/n`, ranges (`1-5`), and lists (`1,3,5`)
- 12-hour clock times, weekday names (Sunday–Saturday), month names
- "Every minute / every N minutes / every hour / every N hours" phrasing
- Preset examples; live description; dark mode; 100% client-side

## Why
Reading `0 9 * * 1-5` at a glance is hard. CronDescribe turns it into "At 9:00 AM, Monday through Friday" instantly, offline. Complements the cron builder and next-run tools in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`describe`, `fmtTime`) are covered by headless tests — every-minute/hour/N forms, fixed daily times, weekday ranges and lists, single weekday (0 and 7 = Sunday), day-of-month + month, 12-hour conversion, and field-count/charset validation. CI runs them on every push.

## License
MIT © Alex Wictor
