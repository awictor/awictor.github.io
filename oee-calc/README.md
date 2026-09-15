# OEE Calculator

Calculate **Overall Equipment Effectiveness** from availability, performance, and quality — entered as run time, part counts, and cycle time.

**[Open the tool →](https://awictor.github.io/oee-calc/)**

- OEE = Availability × Performance × Quality
- Availability = run ÷ planned; Performance = ideal cycle × parts ÷ run; Quality = good ÷ total
- 85% is world-class for discrete manufacturing
- Dark mode, 100% offline, no dependencies, no tracking

## Example

400/480 min up, 700 parts at 0.5 min ideal, 665 good → 83.3% × 87.5% × 95% ≈ 69% OEE.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
