# Takt Time Calculator

Calculate **takt time** from available production time and customer demand, plus required units per hour and whether your cycle time keeps up.

**[Open the tool →](https://awictor.github.io/takt-time/)**

- Takt = available time ÷ demand
- Required units/hour and a cycle-vs-takt bottleneck check
- Units producible per shift
- Dark mode, 100% offline, no dependencies, no tracking

## Example

450 min for 90 units → 5 min/unit (12/hour). A 4-min cycle keeps up; a 6-min cycle is a bottleneck.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
