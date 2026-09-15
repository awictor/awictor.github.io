# Decibel Calculator

A single-file, offline decibel calculator. Convert power and amplitude ratios to dB and back, and combine multiple sound levels from independent sources.

**Live:** https://awictor.github.io/decibel-calc/

## Features

- **Power ratio → dB** — `10·log₁₀(P/P₀)`
- **Amplitude ratio → dB** — `20·log₁₀(A/A₀)`
- **dB → ratio** (power or amplitude)
- **Add sound levels** — combine incoherent sources: `10·log₁₀(Σ 10^(L/10))`
- Dark mode, 100% offline, zero dependencies

## The rules of thumb

- Doubling **power** = **+3 dB**
- Doubling **amplitude** = **+6 dB**
- Two equal sources = +3 dB; four = +6 dB

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions with known dB values. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
