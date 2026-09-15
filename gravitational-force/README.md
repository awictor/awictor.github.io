# Gravitational Force Calculator

Compute the gravitational attraction between two masses with Newton's law `F = G·m₁·m₂ / r²`, plus the gravitational field (surface gravity). Presets for Earth–Moon, Earth–Sun, and two 1 kg masses.

**[Open the tool →](https://awictor.github.io/gravitational-force/)**

- `F = G·m₁·m₂/r²` with G = 6.674×10⁻¹¹
- Field strength `g = G·m/r²` (Earth → 9.8 m/s²)
- Inverse-square, symmetric in the masses
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Two 1 kg masses 1 m apart attract with exactly G ≈ 6.67×10⁻¹¹ N. Earth–Moon ≈ 1.98×10²⁰ N.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
