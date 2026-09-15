# Opioid MME Calculator

**Total daily morphine milligram equivalents (MME).** Add each opioid with its dose and frequency to get a combined MME/day and the CDC risk level. Uses CDC oral conversion factors, with dose-dependent methadone. One offline HTML file, no signup, no tracking.

👉 **[Open Opioid MME Calculator](https://awictor.github.io/opioid-mme/)**

## Factors & thresholds
Oral factors: morphine 1, hydrocodone 1, oxycodone 1.5, hydromorphone 4, oxymorphone 3, codeine 0.15, tramadol 0.1, tapentadol 0.4; methadone 4/8/10/12 by daily dose (≤20/≤40/≤60/>60 mg). CDC: reassess ≥50 MME/day, avoid or justify ≥90.

## Features
- Multiple opioids summed to a daily total
- Tiered methadone; CDC risk banding
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`mmeDaily`, `methadoneFactor`, `totalMME`, `riskLevel`) are covered by headless tests — per-drug factors, methadone tiers and boundaries, multi-opioid totals, risk levels and boundaries, and unknown-drug handling. CI runs them on every push.

## Not medical advice
Educational only; oral factors only (transdermal/buccal differ). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
