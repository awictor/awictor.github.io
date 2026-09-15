# VSWR Calculator

Convert between **VSWR**, **reflection coefficient**, **return loss**, and **mismatch loss** for RF and antenna matching.

**[Open the tool →](https://awictor.github.io/vswr-calc/)**

- |Γ| = (VSWR − 1)/(VSWR + 1)
- Return loss = −20·log₁₀|Γ|; mismatch loss = −10·log₁₀(1 − |Γ|²)
- Enter VSWR or return loss
- Dark mode, 100% offline, no dependencies, no tracking

## Example

VSWR 2:1 → |Γ| 0.333, ~9.5 dB return loss, ~0.51 dB mismatch loss (about 11% of power reflected).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
