# Bend Allowance 📐

Compute sheet metal **bend allowance, bend deduction, and flat blank length** from thickness, inside radius, bend angle, and K-factor. Single HTML file, fully offline, nothing leaves your device.

## Why

Cut a flat blank to the sum of the flange lengths and every bend comes out oversize — the metal's neutral axis doesn't stretch or compress, so you have to account for it. This does the neutral-axis arc math so your formed part lands on-dimension the first time.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/bend-allowance/
- Enter **thickness**, **inside bend radius**, **bend angle**, and **K-factor** (0.30–0.50, ~0.44 for typical steel).
- Enter the **total flange length** (both legs) to get the flat blank.
- Read the bend allowance, bend deduction, and flat blank length (in whatever units you input).

## How it works

- Bend allowance = angle(rad) × (radius + K × thickness) — the arc of the neutral axis.
- The K-factor places the neutral axis as a fraction of thickness; it depends on material, tooling, and method.
- Bend deduction = 2 × outside setback − bend allowance; the flat length subtracts it per bend.
- Dial in the K-factor with a test bend for precision work.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
