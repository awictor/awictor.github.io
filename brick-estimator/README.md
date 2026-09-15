# Brick & Block Wall Estimator 🧱

Estimate how many bricks or blocks and bags of mortar a wall needs, from its size, with a waste allowance — for masonry projects.

**[Open the app →](https://awictor.github.io/brick-estimator/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
area   = length × height
units  = ceil(area × units per sq ft × (1 + waste%/100))
mortar = ceil(units ÷ units per bag)
```

Common densities (3/8″ joint): modular brick ≈ **6.86/sq ft**, 8×8×16 CMU block ≈ **1.125/sq ft**. Roughly one 80 lb mortar bag lays ~120 bricks or ~28 blocks. Add 5–10% waste for cuts and breakage, and subtract large openings from the area.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
