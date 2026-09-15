# Attic Ventilation 🏠

Find the net free vent area an **attic** needs by the 1/300 rule, split between soffit intake and ridge exhaust. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/attic-ventilation/).

Enter the attic floor area and pick the ventilation ratio. You get the total net free vent area and the intake/exhaust split.

## How it works

- Code wants about 1 sq ft of net free vent area per 300 sq ft of attic floor when vents are balanced.
- Without a vapor barrier or with lopsided venting, use the stricter 1/150 ratio.
- Split it roughly 50/50: intake low at the soffits, exhaust high at the ridge, so air rises through.
- Vents list their net free area (not the gross size) — add up NFA to hit these targets.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
