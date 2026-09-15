# Mulch & Soil Calculator

**How much mulch, soil, or compost a garden bed needs.** Enter the bed's dimensions and depth to get cubic yards, cubic feet, and the number of bags to buy. One offline HTML file, no signup, no tracking.

👉 **[Open Mulch & Soil Calculator](https://awictor.github.io/mulch-calc/)**

## Features
- Volume in cubic yards & feet (or m³ & litres)
- Bag count for your bag size (default 2 cu ft)
- Imperial or metric; dark mode; 100% client-side

## Tips
Mulch 2–3 in deep; top-dressing soil/compost 1–3 in. 1 yd³ ≈ covers 100 ft² at ~3¼ in. Order ~10% extra for settling.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cubicFeet`, `cubicYards`, `cubicMeters`, `bagsNeeded`) are covered by headless tests — volume math and unit conversions, bag round-up, zero volume, depth/area scaling, bag-size effects, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
