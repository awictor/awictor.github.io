# AC BTU Calculator

Estimate the **cooling capacity (BTU/hr)** an air conditioner needs for a room, with the standard ENERGY STAR adjustments for sun, occupancy and kitchen load. One offline HTML file, no signup, no tracking.

👉 **[Open AC BTU Calculator](https://awictor.github.io/btu-calc/)**

## The rule
~20 BTU per square foot, then −10% (heavily shaded), +10% (very sunny), +600 BTU per occupant beyond two, and +4,000 BTU for a kitchen.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`baseBtu`, `adjustedBtu`) are covered by headless tests — the per-sq-ft base, no-adjustment case, shaded/sunny factors, occupancy and kitchen additions, combined adjustments, nearest-50 rounding, room-size monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
