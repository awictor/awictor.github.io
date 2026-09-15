# Resistor Network Calculator

Calculate the total resistance of resistors in **series** or **parallel** from a list of values.

**[Open the tool →](https://awictor.github.io/resistor-network/)**

- Series: R = R₁ + R₂ + …
- Parallel: 1/R = 1/R₁ + 1/R₂ + …
- Enter any number of resistors, comma- or line-separated
- Dark mode, 100% offline, no dependencies, no tracking

## Example

100 + 220 + 330 Ω in series = 650 Ω. The same three in parallel ≈ 58.9 Ω — always below the smallest.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
