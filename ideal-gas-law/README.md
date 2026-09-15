# Ideal Gas Law

A single-file, offline **PV = nRT** solver. Pick which variable to solve for — pressure, volume, moles, or temperature — and it computes it from the other three, with handy unit conversions (atm, litres, °C).

**Live:** https://awictor.github.io/ideal-gas-law/

## Features

- Solve for **P, V, n, or T** from the ideal gas law
- Exact gas constant `R = 8.314462618 J/(mol·K)`
- Unit conversions: Pa↔atm↔kPa, m³↔L, K↔°C
- Dark mode, 100% offline, zero dependencies

## Classic check

One mole at 0 °C (273.15 K) and 1 atm (101325 Pa) occupies **22.414 L** — the molar volume at STP.

## Tests

```
node tests/selftest.mjs
```

10 checks including molar volume, round-trips, and Boyle's/Charles's/Gay-Lussac's laws. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
