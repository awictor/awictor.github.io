# MarkupMargin

**Markup vs margin pricing calculator** — enter your unit cost and either a target margin %, markup %, or selling price, and get the rest: price, profit, margin, and markup. Because a 50% markup is only a 33% margin. One offline HTML file, no signup, no tracking.

👉 **[Open MarkupMargin](https://awictor.github.io/markup-margin/)**

## Features
- Solve from cost + margin %, cost + markup %, or cost + price
- Instant margin ↔ markup conversion (they are *not* the same number)
- Handles zero and negative (below-cost) cases sensibly
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
Confusing markup with margin is one of the most common (and expensive) pricing mistakes — mark something up 25% expecting a 25% margin and you're short. MarkupMargin keeps the two straight and shows all four numbers at once. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`priceFromMargin`, `priceFromMarkup`, `marginFromPrice`, `markupFromPrice`, `marginToMarkup`, `markupToMargin`, `analyze`) are covered by headless tests, including round-trips, zero/negative cases, and guards; CI runs them on every push.

## License
MIT © Alex Wictor
