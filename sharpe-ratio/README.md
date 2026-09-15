# Sharpe Ratio

A single-file, offline **risk-adjusted return** calculator. Enter a portfolio return, risk-free rate, and volatility for a quick Sharpe ratio — or paste a return series to derive the mean, sample volatility, and both **Sharpe** and **Sortino** ratios.

**Live:** https://awictor.github.io/sharpe-ratio/

## Features

- **Sharpe** — `(Rp − Rf) / σ`
- **Sortino** — uses downside deviation only (upside swings aren't penalized)
- **From a return series** — mean, sample σ (n−1), Sharpe & Sortino
- **Annualize** — multiply a per-period ratio by √(periods/year): √12 monthly, √252 daily
- Dark mode, 100% offline, zero dependencies

## Rules of thumb

A Sharpe above 1 is generally good, above 2 very good, above 3 excellent — but always compare within the same asset class and period.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions, including known statistical vectors. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
