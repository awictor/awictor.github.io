# Depreciation Calculator

Build a year-by-year **depreciation schedule** using **straight-line**, **double-declining balance**, or **sum-of-years-digits** — each showing depreciation, accumulated depreciation, and remaining book value. One offline HTML file, no signup, no tracking.

👉 **[Open Depreciation Calculator](https://awictor.github.io/depreciation/)**

## Methods
- **Straight-line** — even split of (cost − salvage) over the life.
- **Double-declining balance** — accelerated at twice the SL rate, switching to straight-line on the remaining balance so it fully reaches salvage.
- **Sum-of-years-digits** — accelerated on a fixed fractional schedule.

All three fully depreciate to the salvage value.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`straightLine`, `decliningBalance`, `sumOfYears`, `schedule`, `validate`) are covered by headless tests: worked $10,000 / $1,000 / 5-year vectors for each method, the salvage-floor cap, cross-method total-base equality, running-accumulation/book identity, dispatch, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
