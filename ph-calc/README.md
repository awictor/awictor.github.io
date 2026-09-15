# pH Calculator

Convert between **pH**, **pOH**, hydrogen-ion concentration **[H⁺]**, and hydroxide **[OH⁻]** — enter any one and get the rest, with an acidic / neutral / basic label and a colour-coded scale.

**[Open the tool →](https://awictor.github.io/ph-calc/)**

- `pH = −log₁₀[H⁺]`, `pOH = 14 − pH`, `[H⁺][OH⁻] = 10⁻¹⁴` (25 °C)
- Enter pH, pOH, [H⁺], or [OH⁻]
- Acidity classification and visual pH scale
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

`[H⁺] = 1×10⁻³ mol/L` → pH 3 (acidic), pOH 11, [OH⁻] = 1×10⁻¹¹.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
