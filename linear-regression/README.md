# Linear Regression

A single-file, offline **least-squares** regression tool. Paste your x,y data and get the best-fit line, Pearson correlation, R², predictions, and a plotted trend line.

**Live:** https://awictor.github.io/linear-regression/

## Features

- **Best-fit line** `y = mx + b` via least squares
- **Pearson correlation r** and **R²** (fraction of variance explained)
- **Predict** y at any x
- Live scatter plot with the fitted line
- Flexible input: comma-, space-, or tab-separated points
- Dark mode, 100% offline, zero dependencies

## Formulas

```
m = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)²
b = ȳ − m·x̄
r = Σ(x−x̄)(y−ȳ) / √(Σ(x−x̄)²·Σ(y−ȳ)²)
```

## Tests

```
node tests/selftest.mjs
```

10 checks including perfect/negative fits, a known noisy least-squares result, and r/R² bounds. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
