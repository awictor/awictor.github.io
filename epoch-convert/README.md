# EpochConvert

**Unix timestamp ↔ date converter** — turn a Unix timestamp into a human date (and back), with UTC, local, ISO, and relative time. Auto-detects seconds vs milliseconds. One offline HTML file, no signup, no tracking.

👉 **[Open EpochConvert](https://awictor.github.io/epoch-convert/)**

## Features
- Timestamp → date: UTC, local, ISO 8601, and relative ("3 days ago")
- Date → timestamp: Unix seconds and milliseconds
- Auto-detects whether your number is in seconds or milliseconds
- Live "now" clock; "use now" buttons
- Dark mode, remembers your last inputs
- 100% client-side; works offline

## Why
Every backend logs timestamps, and reading them shouldn't need a round-trip to some website. EpochConvert does it locally and both ways. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`detectUnit`, `epochToDate`, `dateToEpoch`, `formatUTC`, `relativeFromNow`) are covered by headless regression tests against known values; CI runs them on every push.

## License
MIT © Alex Wictor
