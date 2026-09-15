# Pizza Value Calculator

Compare pizzas by **price per square inch** to find the real best deal — and finally settle whether one large beats two mediums. One offline HTML file, no signup, no tracking.

👉 **[Open Pizza Value](https://awictor.github.io/pizza-value/)**

## Why price per area?
Pizza is sold by name (small/medium/large) but you eat **area**, which grows with the *square* of the diameter — a 16″ has ~78% more pizza than a 12″, not 33% more. The best deal is the most square inches per dollar; set a quantity to compare multi-pizza orders.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pizzaArea`, `totalArea`, `pricePerArea`, `areaPerDollar`, `bestValue`) are covered by headless tests — the area formula, the quadratic scaling, the 16″-vs-12″ ratio, quantity scaling, price/area reciprocity, the quantity-aware best-value picker, tie-breaking, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
