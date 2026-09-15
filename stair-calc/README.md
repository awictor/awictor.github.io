# Stair Calculator

Work out **stair risers, riser height, tread depth and total run** from a floor-to-floor height — with building-code and comfort-rule checks. For DIYers, carpenters and deck builders. One offline HTML file, no signup, no tracking.

👉 **[Open Stair Calculator](https://awictor.github.io/stair-calc/)**

## The rules
You can't have a fractional step, so the number of risers is rounded and the exact riser height is back-solved. Common US code (IRC): riser ≤ 7¾″, tread ≥ 10″. Comfort formula: **2 × riser + tread = 24–25″**. There's always one fewer tread than riser.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`numRisers`, `riserHeight`, `treadCount`, `totalRun`, `comfort`) are covered by headless tests — riser rounding and back-solve, treads = risers − 1, total run, the 2R+T formula, a typical-staircase sanity check, monotonicity, the at-least-one-riser clamp, and validation. CI runs them on every push.

## Verify local code
General guidance only; check your local building code before building.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
