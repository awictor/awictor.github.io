# Sump Pump Size 🕳️

Find the pump GPM you need from your **basin diameter** and how fast water rises in the pit. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/sump-pump-size/).

Enter your basin diameter, the inches the water rose, the minutes it took, and a safety factor. You get the measured inflow and a recommended pump capacity in GPM.

## How it works

- Unplug the pump during heavy rain and time how many inches the water climbs in one minute — that's your peak inflow.
- A round basin holds π × radius² ÷ 231 gallons per inch of depth (231 cubic inches per gallon).
- Inflow GPM = gallons per inch × inches risen ÷ minutes.
- Pick a pump rated above inflow × a safety factor (1.5 is common) at your actual discharge height — vertical lift cuts real output.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
