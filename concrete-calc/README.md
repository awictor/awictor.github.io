# Concrete Calculator

**How much concrete you need for a slab or footing** — volume in cubic feet, yards, and cubic metres, plus the number of 40/60/80 lb pre-mix bags. Add a waste allowance; imperial or metric. One offline HTML file, no signup, no tracking.

👉 **[Open Concrete Calculator](https://awictor.github.io/concrete-calc/)**

## Features
- Volume: length × width × thickness → ft³, yd³, m³
- Bags for 40 lb (0.30 ft³), 60 lb (0.45 ft³), 80 lb (0.60 ft³) mixes
- Waste allowance; feet/inches or metres
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cubicFeet`, `cubicYards`, `cubicMeters`, `cubicMetersFromM`, `bagsNeeded`, `withWaste`) are covered by headless tests — volume math and unit conversions, bag round-up for different yields, zero volume, waste, dimensional scaling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
