# Paint Calculator

**Figure out how much paint a room needs.** Enter the room dimensions, coats, and paint coverage — subtract doors and windows, add the ceiling if you like — and get the gallons (or litres) and cans to buy. One offline HTML file, no signup, no tracking.

👉 **[Open Paint Calculator](https://awictor.github.io/paint-calc/)**

## Features
- Wall area from length × width × height (perimeter × height)
- Subtract doors/windows; optional ceiling
- Coats and coverage inputs; feet/metres toggle
- Gallons/litres plus whole cans to buy
- Dark mode; 100% client-side

## The math
Wall area = 2 × (length + width) × height. Paint = paintable area × coats ÷ coverage. Coverage is roughly 350 sq ft (≈33 m²) per gallon per coat on primed walls.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`wallArea`, `ceilingArea`, `netArea`, `paintVolume`, `paintForRoom`) are covered by headless tests — area formulas, opening subtraction with clamping, volume math, coat/coverage scaling, ceiling inclusion, can rounding, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
