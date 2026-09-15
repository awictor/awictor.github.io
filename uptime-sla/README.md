# Uptime SLA Calculator

Calculate how much **downtime** an uptime SLA allows per day, week, month, and year — and the uptime a given downtime achieves.

**[Open the tool →](https://awictor.github.io/uptime-sla/)**

- Allowed downtime = (1 − uptime%) × period
- Presets from 90% to 99.999% (the "nines")
- Achieved-uptime inverse from measured downtime
- Dark mode, 100% offline, no dependencies, no tracking

## Example

99.9% ("three nines") allows 8.76 hours/year; 99.99% allows ~53 minutes; 99.999% just ~5 minutes.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
