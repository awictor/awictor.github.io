# Bike Gearing Calculator

Calculate bicycle **gear inches**, **development** (metres per pedal stroke), **gear ratio**, and **speed** at a cadence from chainring, cog, and wheel size.

**[Open the tool →](https://awictor.github.io/gear-inches/)**

- Gear ratio = chainring ÷ cog
- Gear inches = ratio × wheel diameter
- Development = ratio × wheel circumference
- Speed = development × cadence
- Dark mode, 100% offline, no dependencies, no tracking

## Example

50×14 on a 700c wheel (~2,100 mm) is ~94 gear inches, ~7.5 m/stroke, ~40 km/h at 90 rpm.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
