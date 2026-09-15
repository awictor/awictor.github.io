# Cycling Power Zones

**Calculate your 7 cycling training zones from FTP** using Dr. Andrew Coggan's model. Enter your Functional Threshold Power and get the watt and %FTP ranges for each zone — plus look up which zone any given power falls in. One offline HTML file, no signup, no tracking.

👉 **[Open Cycling Power Zones](https://awictor.github.io/power-zones/)**

## Zones (Coggan)
Z1 Active recovery (<55%), Z2 Endurance (55–75%), Z3 Tempo (75–90%), Z4 Threshold (90–105%), Z5 VO2max (105–120%), Z6 Anaerobic (120–150%), Z7 Neuromuscular (>150%).

## Features
- Watt + %FTP ranges for all 7 zones
- Look up the zone for any power output
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`powerZones`, `zoneForPower`) are covered by headless tests — seven zones, threshold watts at a known FTP, open-ended Z7, FTP=Z4, boundary zones, linear scaling, contiguous ranges, and validation. CI runs them on every push.

## Not medical advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
