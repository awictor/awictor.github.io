# Bond Yield Calculator

A single-file, offline bond calculator. Price a coupon bond from its yield, solve **yield to maturity** from a market price, and read off the **current yield** — with annual, semiannual, or quarterly coupons and zero-coupon support.

**Live:** https://awictor.github.io/bond-yield/

## Features

- **Price from yield** — `Σ C/(1+y)ᵗ + F/(1+y)ⁿ`
- **Yield to maturity** solved numerically (bisection)
- **Current yield** — annual coupon ÷ price
- Par / premium / discount verdict
- Annual, semiannual, or quarterly coupons; zero-coupon bonds
- Dark mode, 100% offline, zero dependencies

## Reminder

Yield = coupon → par · yield < coupon → premium · yield > coupon → discount.

## Tests

```
node tests/selftest.mjs
```

10 checks including par pricing, zero-coupon present value, and YTM round-trips. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
