# Gear Ratio Calculator

A single-file, offline gear calculator. Enter drive and driven tooth counts to get the gear ratio, output speed, and output torque — plus multi-stage compound gear trains.

**Live:** https://awictor.github.io/gear-ratio/

## Features

- **Gear ratio** `= driven / drive`
- **Output speed** `= input ÷ ratio`, **output torque** `= input × ratio`
- Reduction vs overdrive verdict
- **Compound trains** — product of stage ratios
- Dark mode, 100% offline, zero dependencies

## Reminder

Ratio > 1 = reduction (slower, more torque); < 1 = overdrive (faster, less torque). Power is conserved: speed × torque stays constant (ignoring losses).

## Tests

```
node tests/selftest.mjs
```

10 checks including power conservation and compound-train products. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
