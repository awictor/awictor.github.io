# StackDiscount

**Stacked discount calculator** — apply several discounts in sequence (e.g. a 20% sale plus a 10% coupon) and see the final price, total savings, and the *true* effective discount. One offline HTML file, no signup, no tracking.

👉 **[Open StackDiscount](https://awictor.github.io/stack-discount/)**

## Features
- Chain any number of percentage discounts; they **multiply**, not add
- Final price, dollar savings, and effective % off
- Highlights the gap: 20% + 10% is **28%** off, not 30%
- Dark mode; 100% client-side

## Why
Stacked promos are everywhere, and shoppers (and sellers) routinely overestimate them by adding the percentages. StackDiscount shows the real number, offline. Pairs with DiscountCalc in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`applyDiscounts`, `effectiveDiscount`, `savings`) are covered by headless tests — sequential multiplication, the 20%+10%=28% headline, order-independence, savings, 100%-off, three-deep stacking, and out-of-range/negative rejection. CI runs them on every push.

## License
MIT © Alex Wictor
