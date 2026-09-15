# RC / LC Filter Calculator

Compute the **cutoff frequency** and **time constant** of a first-order RC filter (low-pass or high-pass), and the **resonant frequency** of an LC circuit. For electronics design, audio, and RF.

**[Open the tool →](https://awictor.github.io/rc-filter/)**

- RC cutoff `f_c = 1/(2πRC)` and time constant `τ = RC`
- LC resonance `f = 1/(2π√(LC))`
- Engineering-unit inputs (kΩ, µF, mH, nF…) and readable output
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

1 kΩ with 1 µF gives a cutoff of ≈ 159 Hz and a 1 ms time constant. 1 mH with 1 nF resonates at ≈ 159 kHz.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
