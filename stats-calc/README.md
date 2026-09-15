# Statistics Calculator

Paste a list of numbers and get the full set of **descriptive statistics** — count, sum, mean, median, mode, range, variance and standard deviation (both **population** and **sample**), quartiles, and IQR. One offline HTML file, no signup, no tracking.

👉 **[Open Statistics Calculator](https://awictor.github.io/stats-calc/)**

## Notes
- **Population** stats divide by *n*; **sample** stats divide by *n−1* (Bessel's correction) for an unbiased estimate.
- Quartiles use the median-split method (the median is excluded from the halves for odd counts); IQR = Q3 − Q1.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseNumbers`, `mean`, `median`, `mode`, `variance`, `stdev`, `quartiles`, `summary`) are covered by headless tests, including the classic 8-value example (population stdev = 2), sample stats via n−1, quartiles for even and odd counts, multi/no-mode cases, single-value edge cases, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
