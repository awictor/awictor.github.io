# Propane Tank Runtime Calculator 🔥

Estimate how many hours a propane tank will run a grill, patio heater, or generator, from the tank weight and the appliance's BTU/hr rating. Shows total energy and equivalent gallons.

**[Open the app →](https://awictor.github.io/propane-runtime/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Propane holds about **21,594 BTU per pound** (≈ 91,500 BTU/gallon). A full 20 lb BBQ tank is roughly **432,000 BTU**. Divide by the appliance's rated output:

```
runtime (hours) = tank energy (BTU) ÷ appliance output (BTU/hr)
```

A 30,000 BTU/hr grill runs about **14 hours** on a full 20 lb tank at full blast. Real runtime is shorter — tanks fill to ~80%, output falls in the cold, and burners rarely run wide open. Propane weighs about **4.24 lb per gallon**.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
