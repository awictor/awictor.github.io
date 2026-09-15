# FuelCost

**Trip fuel cost calculator** — enter your trip distance, fuel economy (mpg, km/L, or L/100km) and fuel price to get the fuel used, total trip cost, and cost per mile/km. One offline HTML file, no signup, no tracking.

👉 **[Open FuelCost](https://awictor.github.io/fuel-cost/)**

## Features
- Three economy units — mpg (miles), km/L and L/100km (kilometres)
- Fuel used, total cost, and cost per distance
- Round-trip toggle; currency-agnostic (enter any price)
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
"How much will this drive cost me in gas?" is a quick question with fiddly unit math (especially L/100km). FuelCost answers it in whatever units your car and country use. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`fuelUsed`, `tripCost`, `costPerDistance`, `num`) are covered by headless tests across all three economy units, guards, and the km/L vs L/100km relationship; CI runs them on every push.

## License
MIT © Alex Wictor
