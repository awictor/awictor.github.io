# Voltage Drop Calculator

Calculate **voltage drop** over a copper wire run from AWG size, length, and current — plus the **drop percentage** and voltage at the load, with a 3% pass/fail check.

**[Open the tool →](https://awictor.github.io/voltage-drop/)**

- Round-trip drop: 2 × length × current × R(AWG)
- Copper resistance table 18 AWG → 4/0
- Drop percentage and load voltage, 3% guideline verdict
- Dark mode, 100% offline, no dependencies, no tracking

## Example

20 A over a 50 ft run of 12 AWG on 120 V drops ~3.2 V (2.6%) — within the 3% guideline.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
