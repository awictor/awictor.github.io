# Bond Calculator

**Price, yield, and duration for fixed-income bonds.** Enter face value, coupon, maturity, and coupon frequency, then solve for **price** (from a yield) or **yield to maturity** (from a market price). Also shows current yield and Macaulay/modified duration. One offline HTML file, no signup, no tracking.

👉 **[Open Bond Calculator](https://awictor.github.io/bond-calc/)**

## Features
- Solve for price from yield, or YTM from price (numerical bisection)
- Current yield, Macaulay duration, modified duration
- Premium / discount / par indicator
- Annual, semiannual, quarterly, or monthly coupons
- Dark mode; 100% client-side

## The math
Price = present value of coupons + present value of face, discounted at the periodic yield. Modified duration ≈ Macaulay ÷ (1 + periodic yield), estimating the % price move per 1% change in yield.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bondPrice`, `currentYield`, `yieldToMaturity`, `macaulayDuration`, `modifiedDuration`) are covered by headless tests — par pricing, premium/discount, the zero-coupon closed form, YTM inverting price, and zero-coupon duration equal to maturity. CI runs them on every push.

## Not investment advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
