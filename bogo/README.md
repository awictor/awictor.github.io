# Bogo

**Buy-X-get-Y discount calculator** — work out the *real* discount behind buy-one-get-one and buy-X-get-Y deals, plus the true price per item. One offline HTML file, no signup, no tracking.

👉 **[Open Bogo](https://awictor.github.io/bogo/)**

## Features
- Effective discount for any "buy B, get G at D% off" deal
- True price per item and total for the bundle
- Handles free (100% off) and partial-discount "get" items
- Dark mode; 100% client-side

## Why
"Buy one get one free" sounds like 100% off but it's really 50%; "buy 2 get 1 free" is only 33%. Bogo cuts through the marketing and gives the actual discount and per-item price, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`effectiveDiscount`, `pricePerItem`) are covered by headless tests — the classic BOGO/buy-2-get-1/buy-3-get-2 discounts, partial "get" discounts, the more-free-items monotonic rule, per-item pricing, discount-vs-per-item consistency, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
