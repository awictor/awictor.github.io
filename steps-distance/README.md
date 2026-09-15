# Steps to Distance Calculator

Convert step count to **distance** and **calories burned** from stride length and body weight, with stride estimated from height.

**[Open the tool →](https://awictor.github.io/steps-distance/)**

- Distance = steps × stride; stride ≈ 0.415 × height
- Calories ≈ 0.57 kcal/kg/km walked
- Steps-for-distance inverse
- Dark mode, 100% offline, no dependencies, no tracking

## Example

10,000 steps at 170 cm height (~70 cm stride) ≈ 7 km; a 70 kg walker burns ~280 kcal.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
