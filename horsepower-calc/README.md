# Horsepower Calculator

Calculate **horsepower** from torque and RPM, solve for torque from a known power figure, or convert between horsepower and kilowatts.

**[Open the tool →](https://awictor.github.io/horsepower-calc/)**

- hp = torque (lb-ft) × RPM ÷ 5252
- Reverse solve for torque; convert hp ↔ kW
- The 5252 crossover explained
- Dark mode, 100% offline, no dependencies, no tracking

## Example

300 lb-ft at 5,252 RPM = 300 hp (the point where the curves always cross). 300 hp ≈ 223.7 kW.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
