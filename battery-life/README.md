# Battery Life Calculator

Estimate **battery runtime** from capacity (mAh) and load (mA) with a realistic derating factor, plus **watt-hours** and **parallel-pack** capacity.

**[Open the tool →](https://awictor.github.io/battery-life/)**

- Runtime = capacity ÷ load × efficiency
- Solve backward for the load a target runtime allows
- Watt-hours from capacity and voltage
- Parallel-pack capacity and runtime
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 2000 mAh cell driving 100 mA runs ~20 h ideally, ~17 h at 85% derating. It stores 7.4 Wh at 3.7 V.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
