# Roof Area Calculator 🏠

Turn a roof's **footprint and pitch** into its true sloped surface area and the number of **roofing squares** to order, with a waste allowance.

**[Open the app →](https://awictor.github.io/roof-area/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
slope multiplier = √(pitch² + 12²) ÷ 12
roof area        = footprint × slope multiplier
squares          = roof area × (1 + waste%/100) ÷ 100
```

Pitch is rise per 12″ of run: 0:12 → ×1.00, 6:12 → ×1.12, 12:12 (45°) → ×1.41. Roofing is sold in 100 sq ft **squares**; add ~10% waste (more for hips, valleys, and complex cuts). Sum each roof plane separately for a multi-section roof.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
