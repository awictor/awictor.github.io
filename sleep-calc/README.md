# SleepCalc

**Sleep cycle calculator** — find the bedtimes that let you wake up refreshed (or the wake times for a given bedtime) using ~90-minute sleep cycles. One offline HTML file, no signup, no tracking.

👉 **[Open SleepCalc](https://awictor.github.io/sleep-calc/)**

## Features
- "Wake at" → best bedtimes, or "Bed at" → best wake times
- 90-minute cycles with a ~14-minute fall-asleep buffer
- Highlights the 5–6 cycle (7.5–9 h) sweet spot
- Accepts 12h (`7:00 AM`) or 24h (`23:00`) times; wraps across midnight
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Waking mid-cycle is what makes you groggy; waking at the end of one feels great. SleepCalc does the cycle math so you can set the right alarm or bedtime. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseTime`, `mod1440`, `formatTime`, `bedtimes`, `waketimes`) are covered by headless regression tests: 12h/24h parsing, midnight wrap, worked examples (7 AM → 9:46 PM for 6 cycles), and custom cycle options; CI runs them on every push.

## License
MIT © Alex Wictor
