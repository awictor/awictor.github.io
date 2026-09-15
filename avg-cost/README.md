# AvgCost

**Average cost & dollar-cost-averaging calculator** — add your buy lots to get the weighted average cost per share, total invested, unrealized profit/loss at the current price, and exactly how many shares to buy to average down to a target. One offline HTML file, no signup, no tracking.

👉 **[Open AvgCost](https://awictor.github.io/avg-cost/)**

> ⚠️ Estimates only — not financial advice.

## Features
- Unlimited buy lots → weighted average cost, total shares, total invested
- Unrealized P/L (dollar and %) at a current price
- "Average down" solver: shares needed at a buy price to reach a target average
- Fractional shares; dark mode; 100% client-side

## Why
Adding to a position changes your cost basis in ways that are easy to get wrong, and brokers rarely show "what would it take to get my average to $X?" AvgCost answers both, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`averageCost`, `profitLoss`, `sharesToReach`) are covered by headless tests — share-weighted averaging, gain/loss and percent, the averaging-down solver (verified by re-averaging), unreachable-target detection, and validation of empty/invalid lots. CI runs them on every push.

## License
MIT © Alex Wictor
