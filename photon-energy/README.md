# Photon Energy Calculator

Compute a photon's energy from its wavelength or frequency using `E = hf = hc/λ`, and convert freely between **nanometres, terahertz, joules, and electronvolts**. For optics, photonics, spectroscopy, solar-cell and LED/laser work.

**[Open the tool →](https://awictor.github.io/photon-energy/)**

- Enter any of wavelength (nm/µm), frequency (THz), or energy (eV) — get the other three
- Live visible-spectrum colour swatch for the entered wavelength
- 2019 SI exact constants (h, c, eV)
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

500 nm (green) → **2.48 eV**, 599.6 THz, 3.97×10⁻¹⁹ J. A 1 eV photon is 1239.84 nm.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
