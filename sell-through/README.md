# Sell-Through Rate

Calculate **sell-through rate**, **weeks and days of supply**, and a lead-time-aware **reorder flag** from units sold and inventory. Built for retail and Amazon/FBA restock planning. One offline HTML file, no signup, no tracking.

👉 **[Open Sell-Through Rate](https://awictor.github.io/sell-through/)**

## Formulas
- Sell-through = units sold ÷ units received
- Weeks of supply = current stock ÷ average weekly sales (days = ×7)
- Reorder when weeks of supply ≤ lead time + safety stock

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sellThrough`, `weeksOfSupply`, `daysOfSupply`, `reorderNeeded`, `analyze`) are covered by headless tests: sell-through vectors, weeks/days of supply, the reorder threshold (including the exact boundary), a bundled analysis, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
