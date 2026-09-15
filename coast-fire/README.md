# Coast FIRE Calculator

Find your **Coast FIRE number** — the amount invested today that grows into your full retirement target with **zero further contributions**. Once you're there, you only need to cover today's expenses and let compounding finish the job. One offline HTML file, no signup, no tracking.

👉 **[Open Coast FIRE](https://awictor.github.io/coast-fire/)**

## The math
Retirement target = annual spending ÷ withdrawal rate (the 4% rule → 25×). The coast number discounts that target to today at your real return: `coast = target ÷ (1 + r)^years`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`futureValue`, `fireNumber`, `coastNumber`, `yearsToTarget`, `isCoastFire`) are covered by headless tests — compounding, the withdrawal-rate rule, discounting, a coast→future round-trip, rate monotonicity, the years-to-target inverse, the already-there and zero-rate edge cases, the coast verdict, and validation. CI runs them on every push.

## Not financial advice
Estimates only; markets vary and returns are not guaranteed.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
