# CAPM Calculator

A single-file, offline **Capital Asset Pricing Model** calculator. Enter the risk-free rate, beta, and market return to get the expected return, market risk premium, and Jensen's alpha.

**Live:** https://awictor.github.io/capm-calc/

## Features

- **Expected return** `E(R) = Rf + β(Rm − Rf)`
- **Market risk premium** and the asset's own risk premium
- **Jensen's alpha** — actual return vs. CAPM expectation
- **Implied beta** from a target expected return (in the API)
- Dark mode, 100% offline, zero dependencies

## Reminder

β = 1 matches the market, β > 1 is more volatile, β < 1 less. Positive alpha means the asset beat its risk-adjusted expectation.

## Tests

```
node tests/selftest.mjs
```

10 checks including β=0/1 edge cases, alpha, and implied-beta inversion. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
