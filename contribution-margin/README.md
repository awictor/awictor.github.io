# Contribution Margin

Calculate **contribution margin per unit**, the **CM ratio**, **total contribution**, break-even quantity, and the **units needed to hit a profit target**. One offline HTML file, no signup, no tracking.

👉 **[Open Contribution Margin](https://awictor.github.io/contribution-margin/)**

## Formulas
- CM per unit = price − variable cost · CM ratio = CM ÷ price
- Units for profit = (fixed costs + target profit) ÷ CM per unit (target 0 = break-even)

## Tests
```
node tests/selftest.mjs
```
Pure functions (`contributionMargin`, `cmRatio`, `totalCM`, `unitsForProfit`, `analyze`) are covered by headless tests: the CM and ratio vectors, profit-target and break-even units, the ratio×price identity, the total-CM-at-break-even = fixed-costs property, monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
