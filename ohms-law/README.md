# OhmsLaw

**Ohm's law & power calculator** — enter any two of voltage, current, resistance, or power and instantly get the other two, using Ohm's law (V = I·R) and the power equations (P = V·I). One offline HTML file, no signup, no tracking.

👉 **[Open OhmsLaw](https://awictor.github.io/ohms-law/)**

## Features
- Solve from any pair of V / I / R / P — all six combinations
- Highlights which values were computed vs entered
- Handles the square-root cases (from R & P) and rejects impossible zero divisors
- Dark mode; 100% client-side

## Why
The Ohm's-law "wheel" has a dozen rearranged formulas and it's easy to grab the wrong one. OhmsLaw just asks for the two values you know and does the algebra, offline, on the bench. Pairs with [ResistorCalc](https://awictor.github.io/resistor-calc/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `solve` function is covered by headless tests — all six input pairs against a consistent 12 V / 2 A / 6 Ω / 24 W set, a second triple, the exactly-two-inputs rule, zero-divisor rejection, and empty-string handling. CI runs them on every push.

## License
MIT © Alex Wictor
