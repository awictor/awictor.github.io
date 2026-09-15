# Descriptive Statistics

A single-file, offline statistics summary tool. Paste a data set and get count, sum, mean, median, mode, min/max, range, quartiles, IQR, variance, and standard deviation (both sample and population).

**Live:** https://awictor.github.io/descriptive-statistics/

## Features

- **Central tendency** — mean, median, mode (multimodal aware)
- **Spread** — range, variance & std dev (sample n−1 and population n)
- **Quartiles** Q1/Q3 and IQR via linear interpolation (Excel PERCENTILE.INC)
- **Percentile** function for any p
- Flexible input: commas, spaces, or new lines
- Dark mode, 100% offline, zero dependencies

## Tests

```
node tests/selftest.mjs
```

10 checks against known data sets (including σ=2 for `2,4,4,4,5,5,7,9`) and edge cases. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
