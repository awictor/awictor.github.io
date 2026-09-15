# Superheat & Subcooling Calculator

Calculate refrigeration **superheat**, **subcooling**, and the air-side temperature split (ΔT) from line and saturation temperatures.

**[Open the tool →](https://awictor.github.io/superheat/)**

- Superheat = suction line − evaporator saturation
- Subcooling = condenser saturation − liquid line
- Air split ΔT across the coil
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Suction 55 °F, evap sat 40 °F → 15 °F superheat; cond sat 100 °F, liquid 90 °F → 10 °F subcooling.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
