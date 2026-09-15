# Time Value of Money

A single-file, offline **single-sum TVM** calculator. Solve any one of future value, present value, rate, or number of periods from `FV = PV·(1+r)ⁿ`.

**Live:** https://awictor.github.io/time-value-of-money/

## Features

- **Future value** `FV = PV(1+r)ⁿ`
- **Present value** `PV = FV/(1+r)ⁿ`
- **Implied rate** `r = (FV/PV)^(1/n) − 1`
- **Number of periods** `n = ln(FV/PV)/ln(1+r)`
- Dark mode, 100% offline, zero dependencies

## Sanity check

Rule of 72: money doubles in roughly 72 ÷ rate% periods.

## Tests

```
node tests/selftest.mjs
```

10 checks including PV↔FV inversion, implied-rate/period inversion, and a Rule-of-72 sanity check. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
