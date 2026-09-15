# Doppler Effect Calculator

Compute the Doppler frequency shift for **sound** (moving source and/or observer) and **light** (relativistic), plus the observed wavelength and redshift *z*. Used by radar guns, weather radar, medical ultrasound, and astronomers measuring galaxy velocities.

**[Open the tool →](https://awictor.github.io/doppler-effect/)**

- Acoustic mode: separate source/observer velocities relative to the air `f′ = f·(c+v_obs)/(c−v_src)`
- Relativistic mode: `f′ = f·√((1+β)/(1−β))` with observed wavelength and redshift z
- Blueshift / redshift indicator
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

Sound at 1000 Hz, source approaching at 34.3 m/s (c = 343) → 1111 Hz. Light at β = 0.6 approaching → frequency doubles.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
