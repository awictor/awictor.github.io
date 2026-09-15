# Sod Calculator 🟩

Work out how much sod to order for a lawn: total area, pieces, and pallets, with a waste allowance for cuts and odd shapes.

**[Open the app →](https://awictor.github.io/sod-calculator/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
area    = length × width
pieces  = ceil(area × (1 + waste%/100) ÷ piece size)
pallets = ceil(area × (1 + waste%/100) ÷ pallet size)
```

A common sod slab is 16″ × 24″ (~2 sq ft) and a pallet covers ~450 sq ft, though sizes vary by supplier. Add 5–10% waste for cuts around curves and beds, lay it the day it arrives, stagger the seams like bricks, and water it in.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
