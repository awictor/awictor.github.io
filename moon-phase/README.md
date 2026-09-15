# MoonPhase

**Moon phase for any date** — pick a date and see the moon's phase, its age in days, and the illuminated fraction, with a live moon graphic. One offline HTML file, no signup, no tracking.

👉 **[Open MoonPhase](https://awictor.github.io/moon-phase/)**

## Features
- Phase name (New → Full → Waning Crescent), moon age in days, illuminated %
- Live disc graphic lit from the correct (waxing/waning) side
- Uses the mean synodic month from a known new-moon epoch
- Dark mode; 100% client-side

## Why
Knowing the moon phase is handy for photography, stargazing, gardening, and calendars. MoonPhase computes it for any date offline, no location or account needed. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Accuracy
This uses the mean synodic month (29.53 days), accurate to about a day — perfect for planning, not for precise eclipse or exact-minute timing.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`moonAge`, `illumination`, `phaseName`, `phase`, `jdFromMs`) are covered by headless tests anchored on the new-moon epoch — new/full/quarter phases, illumination range and symmetry, waxing monotonicity, modulo wrap, phase-name bands, and the Unix-epoch Julian Date. CI runs them on every push.

## License
MIT © Alex Wictor
