# GMROI

Calculate **GMROI** — gross margin return on inventory investment — from revenue, COGS, and average inventory cost, with gross profit, margin %, and a profitability verdict. For retail and Amazon/FBA assortment decisions. One offline HTML file, no signup, no tracking.

👉 **[Open GMROI](https://awictor.github.io/gmroi-calc/)**

## Formula
`GMROI = gross margin $ ÷ average inventory cost`. Above 1.0 means inventory earns back more than it costs; retailers often target 3.0+. It rewards both margin and turnover.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`grossProfit`, `grossMarginPct`, `gmroi`, `verdict`, `analyze`) are covered by headless tests: the worked example, the margin×(revenue/inventory) identity, the break-even case, verdict bands, monotonicity in margin and inventory, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
