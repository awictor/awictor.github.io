# Battery C-Rate 🔋

Convert between **battery capacity, C-rate, current, and runtime** — for LiPo, Li-ion, and any other pack. Single HTML file, fully offline, nothing leaves your device.

## Why

C-rate is the language of battery specs, but it trips people up: is "2C" a current, a time, or a limit? It's all three, related by the capacity. RC pilots, drone builders, solar and EV tinkerers all need to turn a pack's C-rating into real amps and minutes — and to check they're not about to exceed the pack's safe draw. This does that in one screen.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/battery-c-rate/
- Enter the **pack capacity** in amp-hours.
- Enter the **C-rate**.
- Read the charge/discharge current, the ideal runtime, and the 1C reference current.

## How it works

- Current (A) = capacity (Ah) × C-rate. A 5 Ah pack at 2C delivers 10 A.
- Ideal runtime (hours) = 1 ÷ C-rate — 1C runs an hour, 2C half an hour.
- Every cell has a max continuous C-rate; exceeding it overheats and damages the pack.
- Real runtime falls a little short of ideal — high currents lose capacity to heat and voltage sag (the Peukert effect).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
