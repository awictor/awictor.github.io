# Tankless Water Heater Sizing 🚿

Size a tankless (on-demand) water heater from your peak flow and temperature rise: the **BTU/hr** you need, the **GPM** a unit can deliver, and the rise from incoming to target temperature.

**[Open the app →](https://awictor.github.io/tankless/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
rise = target − incoming
BTU  = GPM × 500 × rise
GPM  = BTU ÷ (500 × rise)
```

It takes ~**500 BTU/hr** to raise 1 gallon/minute by 1 °F. Cold northern groundwater (~40 °F) needs a much bigger rise than warm southern water (~65 °F), so the same unit delivers fewer GPM up north. Add up simultaneous fixtures for peak flow (shower ~2 GPM, sink ~1).

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
