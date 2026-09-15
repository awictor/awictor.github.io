# ChangeMaker

**Cash change & denomination breakdown** — enter an amount (or a price plus cash paid) and get the fewest bills and coins to make it, with a running piece count. USD denominations. One offline HTML file, no signup, no tracking.

👉 **[Open ChangeMaker](https://awictor.github.io/change-maker/)**

## Features
- Two modes: break down any amount, or compute change due from price + cash
- Greedy (fewest-pieces) breakdown across $100 → 1¢
- Total piece count; float-safe cents conversion
- Dark mode; 100% client-side

## Why
At a register or splitting cash, "what's the smallest number of bills and coins for $2.87?" is a quick but fiddly question. ChangeMaker answers it instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toCents`, `makeChange`, `totalCount`, `changeDue`) are covered by headless tests — cents rounding, the $2.87 breakdown, exact denominations, the sums-back-to-amount invariant across many values, piece counts, underpayment rejection, and denomination ordering. CI runs them on every push.

## License
MIT © Alex Wictor
