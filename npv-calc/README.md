# NPV

**Net present value & IRR calculator** — enter a discount rate and a series of cash flows to get the net present value and the internal rate of return. One offline HTML file, no signup, no tracking.

👉 **[Open NPV](https://awictor.github.io/npv-calc/)**

> ⚠️ Estimates only — not financial advice.

## Features
- NPV at any discount rate; positive/negative verdict against your hurdle rate
- IRR solved by bisection (robust, returns nothing when there's no sign change)
- Add/remove periods; year 0 is the initial outlay
- Dark mode; 100% client-side

## Why
NPV and IRR are the core tools for deciding whether a project or investment is worth it, but they're a hassle to set up in a spreadsheet each time. NPV does both instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`npv`, `irr`) are covered by headless tests — undiscounted sums, discounting, classic IRR cases (`[-100,110]`→10%), the NPV-is-zero-at-IRR identity, no-sign-change → null, and monotonicity of NPV in the rate. CI runs them on every push.

## License
MIT © Alex Wictor
