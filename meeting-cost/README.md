# Meeting Cost Calculator

Estimate what a meeting actually costs — from attendee count, hourly rate (or annual salary), and duration — plus the **cost per minute** and the **annualized cost** if it's a weekly recurring meeting.

**[Open the tool →](https://awictor.github.io/meeting-cost/)**

- `cost = attendees × hourly rate × hours`
- Salary → hourly via 2080 work-hours/year
- Per-minute burn rate and yearly cost of a weekly meeting
- Dark mode, 100% offline, no dependencies, no tracking

## Example

6 people, $75/h average, 60 min → **$450**; $7.50/min; $23,400/yr if held weekly.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
