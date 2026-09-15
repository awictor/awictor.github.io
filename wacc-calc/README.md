# WACC Calculator

Calculate the **weighted average cost of capital** from equity and debt values, cost of equity, cost of debt, and tax rate — with the capital-structure weights and after-tax cost of debt shown. One offline HTML file, no signup, no tracking.

👉 **[Open WACC Calculator](https://awictor.github.io/wacc-calc/)**

## Formula
`WACC = (E/V)·Re + (D/V)·Rd·(1−Tc)`, where V = E + D. Debt gets the **(1 − tax)** shield because interest is tax-deductible. WACC is the standard discount rate for valuing a firm or project.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`wacc`, `analyze`) are covered by headless tests: the classic 7.4% worked example, weights summing to 1, all-equity and all-debt edge cases, the tax-shield effect, monotonicity in cost of equity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
