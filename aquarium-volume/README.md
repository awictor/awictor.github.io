# Aquarium Volume Calculator

**How much water your tank holds.** Enter a rectangular aquarium's dimensions to get the volume in US gallons and litres, plus the filled water weight in pounds and kilograms. One offline HTML file, no signup, no tracking.

👉 **[Open Aquarium Volume](https://awictor.github.io/aquarium-volume/)**

## Features
- Volume in gallons and litres (231 in³/gal, 1000 cm³/L)
- Filled water weight (≈8.34 lb/gal, ≈1 kg/L)
- Inches or centimetres; dark mode; 100% client-side

## Note
Actual capacity is a bit less than outside dimensions imply (glass thickness, trim, fill line). Add substrate, rock, and the tank's own weight when planning a stand or floor load.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gallonsFromInches`, `litersFromCm`, `gallonsToLiters`, `litersToGallons`, `waterWeightLb`, `waterWeightKg`) are covered by headless tests — the 231-in³ gallon, 1000-cm³ litre, conversions and round trips, water weights, dimensional scaling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
