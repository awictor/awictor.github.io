# 555 Timer Calculator

Design a 555 timer circuit: **astable** frequency, duty cycle, and high/low times from R1, R2, and C, or the **monostable** one-shot pulse width.

**[Open the tool →](https://awictor.github.io/ne555-timer/)**

- Astable: f = 1.44 / ((R1 + 2·R2)·C), duty = (R1+R2)/(R1+2·R2)
- Monostable: pulse = 1.1·R·C
- Auto-scaled time units (s / ms / µs)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

R1 = 1 kΩ, R2 = 1 kΩ, C = 1 µF → 480 Hz at a 67% duty cycle.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
