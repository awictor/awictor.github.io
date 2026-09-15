# Wind Turbine Power Calculator 🌬️

Estimate the power a wind turbine produces from its rotor diameter, wind speed, and efficiency — plus annual energy output. Uses the standard wind-power equation and the Betz limit.

**[Open the app →](https://awictor.github.io/wind-turbine/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Power rises with the **cube** of wind speed:

```
P = ½ · ρ · A · v³ · Cp
```

- **ρ** — air density (~1.225 kg/m³ at sea level, 15 °C)
- **A** — rotor swept area, `π·r²`
- **v** — wind speed (m/s)
- **Cp** — power coefficient, the captured fraction of wind energy

No rotor can exceed the **Betz limit** of 16/27 ≈ 0.593; good real turbines reach Cp ≈ 0.35–0.45. Doubling wind speed gives 8× the power, so siting dominates. Annual energy applies a **capacity factor** (typically 0.25–0.45) over 8,760 hours.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
