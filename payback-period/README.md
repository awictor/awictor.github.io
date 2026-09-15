# Payback Period Calculator

**How long to recoup an investment.** Enter the upfront cost and the cash flows per period to get the payback period — plus the **discounted** payback at a chosen rate — with fractional-period precision and a cumulative-recovery table. One offline HTML file, no signup, no tracking.

👉 **[Open Payback Period](https://awictor.github.io/payback-period/)**

## Features
- Simple payback with fractional interpolation
- Discounted payback (each flow discounted by rate) — always longer
- Cumulative recovery table; "never" when flows don't cover the cost
- Dark mode; 100% client-side

## Note
Payback ignores cash flows after recovery and (for the simple version) the time value of money — use it alongside NPV or ROI, not instead of them.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`paybackPeriod`, `discountedPaybackPeriod`, `cumulative`) are covered by headless tests — even/uneven flows, fractional periods, exact-cover, never-recovered, discounted vs simple, 0% equivalence, the cumulative series, and validation. CI runs them on every push.

## Not financial advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
