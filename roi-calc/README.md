# ROICalc

**Return on investment calculator** — enter an initial investment and final value (and a holding period) to get total ROI %, net profit, and the annualized return. One offline HTML file, no signup, no tracking.

👉 **[Open ROICalc](https://awictor.github.io/roi-calc/)**

## Features
- Total ROI % and net profit (gain or loss, color-coded)
- Annualized return over the holding period
- Handles losses and guards divide-by-zero
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
"Was it a good return?" needs both the total and the annualized figure — a 50% gain over 10 years is very different from 50% in one. ROICalc shows both. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`roi`, `netProfit`, `annualizedROI`) are covered by headless regression tests, including that the annualized rate compounds back to the total; CI runs them on every push.

## License
MIT © Alex Wictor
