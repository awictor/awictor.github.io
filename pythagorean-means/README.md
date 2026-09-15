# Pythagorean Means Calculator

Compute the **arithmetic**, **geometric**, and **harmonic** means (plus **root-mean-square**) of a data set — and know which to use for growth rates, speeds, and magnitudes.

**[Open the tool →](https://awictor.github.io/pythagorean-means/)**

- AM (sum ÷ n), GM (nth root of product), HM (n ÷ Σ1/x), RMS
- For positive data they order HM ≤ GM ≤ AM ≤ RMS
- Guards for non-positive (GM) and zero (HM)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

[1, 2, 4] → AM 2.33, GM 2, HM 1.71, RMS 2.65. Round-trip speeds 60 & 40 → harmonic mean 48.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
