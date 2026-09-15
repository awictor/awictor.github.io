# MaintenanceFluids

**IV maintenance fluid calculator** — get the daily maintenance volume (Holliday-Segar) and hourly rate (the 4-2-1 rule) from body weight. One offline HTML file, no signup, no tracking.

👉 **[Open MaintenanceFluids](https://awictor.github.io/maintenance-fluids/)**

## Features
- Holliday-Segar daily volume (100/50/20 mL/kg/day tiers)
- 4-2-1 rule hourly rate (4/2/1 mL/kg/hr tiers)
- Works from infants to adults; continuous across tiers
- Dark mode; 100% client-side

## Why
The weight-based tiers are easy to fumble under pressure. MaintenanceFluids computes both the daily and hourly maintenance requirements offline. Maintenance only — deficits and ongoing losses are separate. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
This estimates baseline maintenance fluids; clinical situations (dehydration, losses, cardiac/renal limits) require judgment.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dailyMl`, `hourlyMl`) are covered by headless tests — both tier sets, boundary continuity, monotonicity, the daily-vs-hourly approximation, fractional weights, infant/adult cases, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
