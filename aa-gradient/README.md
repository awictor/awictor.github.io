# A-a Gradient

Calculate the **alveolar-arterial (A-a) oxygen gradient** from FiO₂, PaCO₂, and PaO₂, with the age-expected value — the bedside tool for working out *why* a patient is hypoxic. One offline HTML file, no signup, no tracking.

👉 **[Open A-a Gradient](https://awictor.github.io/aa-gradient/)**

## Equations
- Alveolar gas equation: `PAO₂ = FiO₂·(Patm − PH₂O) − PaCO₂/R` (sea level: 760 / 47 / 0.8)
- A-a gradient = PAO₂ − PaO₂
- Age-expected upper normal ≈ age/4 + 4

> Educational aid, not medical advice.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`alveolarPO2`, `aaGradient`, `expectedGradient`, `analyze`) are covered by headless tests: the room-air and 100%-O₂ vectors, the age/4+4 expected values, PaCO₂/altitude/respiratory-quotient effects, elevated-vs-normal flagging, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
