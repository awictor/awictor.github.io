# Inventory Turnover Calculator

Calculate **inventory turnover ratio** and **days sales of inventory (DSI)** from COGS and your beginning/ending inventory. Useful for retail and Amazon/FBA sellers balancing restock timing against storage costs. One offline HTML file, no signup, no tracking.

👉 **[Open Inventory Turnover Calculator](https://awictor.github.io/inventory-turnover/)**

## Formulas
- Average inventory = (beginning + ending) / 2
- Turnover = COGS ÷ average inventory
- DSI = period days ÷ turnover

Higher turnover = leaner, faster-moving stock; DSI is the average days a unit sits before selling.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`averageInventory`, `turnover`, `daysSalesOfInventory`, `analyze`) are covered by headless tests: worked COGS/inventory examples, the DSI = period·avgInv/COGS identity, the turnover→DSI inverse relationship, a custom 90-day quarter, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
