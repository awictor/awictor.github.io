# PositionSize

**Trading position size & risk calculator** — enter your account size, risk per trade, entry and stop-loss, and get the exact number of shares/units to trade so a stop-out never costs more than you budgeted. Add a target for instant risk:reward. One offline HTML file, no signup, no tracking.

👉 **[Open PositionSize](https://awictor.github.io/position-size/)**

## Features
- Position size = (account × risk%) ÷ (entry − stop), **rounded down** so your loss stays within budget
- Works for long *and* short trades (direction inferred from entry vs. stop)
- Shows amount at risk, risk per unit, position value, and % of account
- Risk:reward ratio and total potential reward from an optional target price
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
The single most important trade decision — how big — is the one most people eyeball. PositionSize turns your risk rule into an exact share count in one glance, and never rounds up past your budget. Part of the [Toolkit](https://awictor.github.io/toolkit/).

> Not financial advice. A sizing tool, not a strategy — sanity-check every trade.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`positionSize`, `riskReward`, `num`) are covered by headless tests, including a sweep asserting the risk budget is never exceeded and long/short symmetry; CI runs them on every push.

## License
MIT © Alex Wictor
