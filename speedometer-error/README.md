# Speedometer Error Calculator

See how a **tire size change** throws off your speedometer: the actual speed when it reads X, the percent error, and tire diameter from a size like 225/45R17.

**[Open the tool →](https://awictor.github.io/speedometer-error/)**

- actual = indicated × new ÷ original diameter
- Percent error and both tire diameters
- Diameter from width / aspect / rim
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Going from 225/45R17 to 245/45R17 makes the tire ~0.7″ taller; at an indicated 60 you're really doing ~62 (+2.9%).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
