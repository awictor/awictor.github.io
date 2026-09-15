# Molarity & Dilution Calculator

A single-file, offline chemistry lab helper. Compute molarity from moles and volume, dilute a stock solution with `C₁V₁ = C₂V₂`, and convert mass to moles with a molar mass.

**Live:** https://awictor.github.io/molarity-dilution/

## Features

- **Molarity** `M = n / V` (and the inverse for moles)
- **Dilution** — final volume `V₂ = C₁V₁ / C₂` and how much solvent to add
- **Mass ↔ moles** via molar mass
- Guards against "diluting" to a higher concentration
- Dark mode, 100% offline, zero dependencies

## Example

10 M stock, 5 mL, diluted to 1 M → top up to **50 mL** (add 45 mL solvent). 58.44 g NaCl = 1 mole.

## Tests

```
node tests/selftest.mjs
```

10 checks including the C₁V₁ = C₂V₂ invariant and a weigh→dissolve→molarity workflow. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
