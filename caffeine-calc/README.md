# Caffeine Calculator

See how much **caffeine** is left in your system after N hours using its half-life, when it drops below a **bedtime threshold**, and how much has been metabolized.

**[Open the tool →](https://awictor.github.io/caffeine-calc/)**

- remaining = dose × 0.5^(hours ÷ half-life)
- Time to reach a threshold = half-life × log₂(dose ÷ target)
- Metabolized amount and fraction remaining
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 200 mg coffee at a 5 h half-life leaves 100 mg after 5 h and takes ~10 h to fall below 50 mg. Not medical advice.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
