# Duration

**Humanize & parse time durations** — turn a number of seconds into `1d 2h 3m 4s`, parse durations like `1h30m` or `01:30:00`, and read them back as `h:mm:ss`, minutes, and hours. One offline HTML file, no signup, no tracking.

👉 **[Open Duration](https://awictor.github.io/duration/)**

## Features
- Human-readable output (`1d 2h 3m 4s`), skipping zero units
- Parses unit form (`d h m s`) and clock form (`hh:mm:ss`, `mm:ss`)
- Also accepts a bare number of seconds and decimals (`1.5h`)
- Shows total seconds / minutes / hours
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Logs, timers, video lengths, and configs all express durations differently. Duration converts between "89 minutes", "1h29m", "1:29:00", and "5340 seconds" instantly and offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`humanizeDuration`, `toClock`, `parseDuration`) are covered by headless regression tests, including unit/clock/number parsing, garbage rejection, and `parse(humanize(x)) === x` round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
