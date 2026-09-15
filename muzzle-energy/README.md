# Muzzle Energy Calculator

Calculate bullet **muzzle energy** (ft-lbs) from grains and fps, the **IPSC/USPSA power factor**, the **Taylor KO** value, and fps → m/s. A sporting, hunting, and reloading reference.

**[Open the tool →](https://awictor.github.io/muzzle-energy/)**

- Energy = grains × fps² ÷ 450240
- Power factor = grains × fps ÷ 1000
- Taylor KO = grains × fps × diameter ÷ 7000
- Velocity in m/s
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 150 gr bullet at 2800 fps carries ~2,612 ft-lbs (a typical .308). A 124 gr 9mm at 1100 fps makes a 136 power factor.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
