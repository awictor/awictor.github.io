# EV Charger Circuit 🚙

Size the **breaker and wire** for a Level 2 EV charger from its amps, using the NEC 125% continuous-load rule. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/ev-charger-circuit/).

Enter the charger's output current in amps. You get the breaker size, minimum circuit ampacity, and copper wire gauge.

## How it works

- EV charging is a continuous load, so the circuit must carry 125% of the charger's rated current.
- Round that up to the next standard breaker (15, 20, 30, 40, 50, 60…); a 40 A charger needs a 50 A breaker.
- Wire gauge follows the breaker — 50 A wants 6 AWG copper, 40 A wants 8 AWG (75°C column).
- Always confirm against NEC 625 and your local code, and derate for long runs or bundled conductors.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
