# Curtain Width Calculator 🪟

Work out how wide your curtains need to be and how many panels to buy for a window, using a **fullness ratio** for a proper gathered look.

**[Open the app →](https://awictor.github.io/curtain-width/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
fabric width = rod width × fullness
panels       = ceil(fabric width ÷ panel width)
fullness     = total panel width ÷ rod width
```

Measure the **rod**, not just the glass. **2×** is the everyday standard; sheers can go 1.5×, a rich drapey look 2.5–3×. Panels usually come in pairs — round up. The finished, gathered curtain looks about half as wide as the flat fabric.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
