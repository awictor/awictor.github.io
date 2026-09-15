# Sparkline

**Numbers → text sparkline chart** — paste a series of numbers and get a compact unicode sparkline (`▁▂▃▄▅▆▇█`) you can drop into a spreadsheet, dashboard, commit message, Slack, or docs — plus min/max/mean/sum stats. One offline HTML file, no signup, no tracking.

👉 **[Open Sparkline](https://awictor.github.io/sparkline/)**

## Features
- Maps values to eight block heights scaled between the min and max
- Accepts comma-, space-, or newline-separated numbers (integers, decimals, exponents)
- Min / max / mean / sum readout; click the sparkline to copy it as plain text
- Dark mode; remembers your input; 100% client-side; works offline

## Why
A sparkline says "trend" in the width of a word — perfect for a commit body, a README, or a status line, without an image or a chart library. Sparkline turns raw numbers into copyable text. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sparkline`, `parseNumbers`, `stats`, `BLOCKS`) are covered by headless tests — the 1–8 full-range mapping, extremes, flat data, non-finite filtering, min/max positions, and parsing; CI runs them on every push.

## License
MIT © Alex Wictor
