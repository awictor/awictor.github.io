# Hot Tub Heat-Up Time ♨️

Estimate how long a **hot tub** takes to reach temperature from water volume, temperature rise, and heater power. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/hot-tub-heat-time/).

Enter the water volume, start and target temperatures, and heater power in kW. You get the heat-up time, energy needed, and the rise rate in °F per hour.

## How it works

- A gallon of water weighs 8.34 lb, and 1 BTU raises 1 lb by 1°F — so energy = gallons × 8.34 × temperature rise.
- An electric heater delivers 3412 BTU per kWh, so hours = energy ÷ (kW × 3412).
- This ignores heat loss through the cover and shell — a well-covered tub loses little, an open one loses a lot.
- Most 240V spa heaters are 4–6 kW; 120V plug-in units are about 1–1.5 kW and much slower.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
