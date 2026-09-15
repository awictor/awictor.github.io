# Sail Area Ratio Calculator 🛥️

Compute a sailboat's three headline performance ratios — **sail area-displacement (SA/D)**, **displacement-length (D/L)**, and **ballast ratio** — from a few numbers off the spec sheet.

**[Open the app →](https://awictor.github.io/sail-area/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
SA/D = SA / (Disp/64)^(2/3)
D/L  = (Disp/2240) / (0.01·LWL)³
ballast ratio = ballast / displacement × 100
```

- **SA/D** — power-to-weight of sailing: <16 heavy cruiser, 16–20 cruiser-racer, >20 performance.
- **D/L** — hull heaviness for its length: >300 heavy and sea-kindly, <150 light and lively.
- **Ballast ratio** — stiffness; 35–45% is typical for a keelboat.

Displacement uses 64 lb/ft³ (seawater) and 2240 lb per long ton. Pairs well with the [Hull Speed](https://awictor.github.io/hull-speed/) calculator.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
