# Duty Cycle / PWM Calculator

A single-file, offline PWM calculator. Set a duty cycle and frequency to get the period, on/off times, and the average output voltage — for microcontroller LED dimming, motor control, and signal generation.

**Live:** https://awictor.github.io/duty-cycle/

## Features

- **Duty cycle** `D = t_on / T`
- **Period ↔ frequency** (`T = 1/f`)
- **On-time / off-time** from duty and period
- **Average voltage** `Vcc × D`
- Dark mode, 100% offline, zero dependencies

## Example

40% duty at 1 kHz on a 5 V pin → 0.4 ms high, 0.6 ms low, averaging 2 V.

## Tests

```
node tests/selftest.mjs
```

10 checks including on+off = period, duty↔on-time inversion, and a full PWM setup. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
