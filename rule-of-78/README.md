# Rule of 78 Calculator

A single-file, offline calculator for the **Rule of 78** (sum-of-digits) method of allocating precomputed loan interest. See how much interest is "earned" and how much is rebated if you pay a loan off early.

**Live:** https://awictor.github.io/rule-of-78/

## Features

- **Unearned interest** (early-payoff rebate): `total × (n−m)(n−m+1) / [n(n+1)]`
- **Earned interest** and the percentage earned so far
- Sum-of-digits weighting (78 for a 12-month loan)
- Dark mode, 100% offline, zero dependencies

## Why it matters

The Rule of 78 **front-loads** interest, so early payoff rebates less than simple interest would — worth knowing before you sign. Many places restrict it for longer loans.

## Tests

```
node tests/selftest.mjs
```

10 checks including sum-of-digits = 78, the classic $269.23 rebate, and earned+unearned = total. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
