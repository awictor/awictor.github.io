# CAC & LTV

Calculate **customer acquisition cost (CAC)**, **lifetime value (LTV)**, the **LTV:CAC ratio**, average customer lifetime, and **CAC payback period** for a subscription business. One offline HTML file, no signup, no tracking.

👉 **[Open CAC & LTV](https://awictor.github.io/cac-ltv/)**

## Formulas
- CAC = sales & marketing spend ÷ new customers
- Avg lifetime = 1 ÷ monthly churn
- LTV = (ARPA × gross margin) ÷ monthly churn
- LTV:CAC ≈ 3:1 is considered healthy; CAC payback = CAC ÷ monthly gross profit

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cac`, `avgLifetimeMonths`, `ltv`, `ltvCacRatio`, `paybackMonths`, `analyze`) are covered by headless tests: the worked example (CAC 200, LTV 1600, ratio 8, payback 2.5mo), LTV = margin·lifetime identity, churn/CAC sensitivity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
