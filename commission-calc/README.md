# Commission Calculator

**Work out sales commission** — a flat rate or a tiered (marginal, bracket-style) plan — with the total payout and effective rate. One offline HTML file, no signup, no tracking.

👉 **[Open Commission Calculator](https://awictor.github.io/commission-calc/)**

## Tiered = marginal
Each portion of sales within a tier earns that tier's rate, like tax brackets. E.g. 5% up to $100k then 10% above → on $150k you earn 5% × $100k + 10% × $50k = $10,000. Leave the top tier's "up to" blank for "and above".

## Features
- Flat or tiered modes; add/remove tiers
- Total commission and effective rate
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`flatCommission`, `tieredCommission`, `effectiveRate`) are covered by headless tests — flat math, tiers below/above/at boundaries, three-tier example, effective rate, zero sales, accelerator behavior, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
