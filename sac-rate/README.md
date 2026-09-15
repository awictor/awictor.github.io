# SAC Rate 💨

Work out your **surface air consumption**, breathing volume (RMV), and how long a tank lasts at depth. Single HTML file, fully offline, nothing leaves your device.

## Why

SAC is the number every dive plan hangs on: know how fast *you* breathe, normalized to the surface, and you can predict gas at any depth. It's a personal constant worth measuring — and the psi-to-cuft-to-minutes conversions are exactly the kind of thing you don't want to fumble on a boat.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/sac-rate/
- Enter **gas used** (psi), **time at depth**, and **average depth** from a real dive.
- Enter your **tank size and service pressure** for the RMV conversion.
- Read your SAC, RMV, the ATA at depth, and how long a full tank would last there.

## How it works

- Every 33 ft adds 1 atmosphere, so gas is consumed faster at depth in proportion to pressure.
- SAC = psi used ÷ (minutes × ATA) — normalized to the surface.
- RMV = SAC × (tank cu ft ÷ service psi) — your true breathing volume.
- Duration = tank psi ÷ (SAC × ATA) at the new depth.

Measure SAC on a relaxed, flat dive; stress and exertion raise it. Always plan gas with a reserve.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
