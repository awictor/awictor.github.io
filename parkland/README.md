# Parkland Formula

**Burn fluid resuscitation calculator.** Enter patient weight and % total body surface area burned to get the first-24-hour crystalloid volume by the Parkland formula — half over the first 8 hours, half over the next 16 — with hourly infusion rates. One offline HTML file, no signup, no tracking.

👉 **[Open Parkland Formula](https://awictor.github.io/parkland/)**

## The formula
`Total (mL) = 4 mL × weight (kg) × %TBSA`, given as crystalloid (e.g. lactated Ringer's) over 24 h: 50% in the first 8 hours **from the time of injury**, 50% over the next 16. The mL/kg factor is adjustable for modified protocols (2–3 mL). Titrate to urine output — the formula is only a starting estimate.

## Features
- Total 24h volume plus 8h / 16h split with mL/hr rates
- Adjustable mL/kg/%TBSA factor and a TBSA slider
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
The pure function (`parkland`) is covered by headless tests — the 70 kg / 30% = 8400 mL reference, equal halves, the 8h rate being double the 16h rate, linearity, custom factors, and validation. CI runs them on every push.

## Not medical advice
For education only; not a substitute for clinical judgment. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
