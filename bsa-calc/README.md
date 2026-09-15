# BsaCalc

**Body surface area (BSA) calculator** — compute BSA from height and weight using the Mosteller, Du Bois, Haycock, and Gehan-George formulas, side by side, in metric or imperial units. One offline HTML file, no signup, no tracking.

👉 **[Open BsaCalc](https://awictor.github.io/bsa-calc/)**

> ⚠️ **Educational estimate.** BSA formulas are approximations. For clinical use (e.g. drug dosing), always follow your institution's protocol and verify independently.

## Features
- Four formulas at once — pick a primary, compare the rest
- Height in cm/in, weight in kg/lb (converted automatically)
- Mosteller shown as the default (`√(height·weight ⁄ 3600)`)
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
BSA drives chemotherapy dosing, cardiac index, and more — and different sources use different formulas. BsaCalc shows all four together so you can see the spread and use the one your protocol specifies. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`mosteller`, `dubois`, `haycock`, `gehanGeorge`, `bsa`, unit helpers) are covered by headless tests, including the exact Mosteller formula, cross-formula agreement, monotonicity, and unit conversion; CI runs them on every push.

## License
MIT © Alex Wictor
