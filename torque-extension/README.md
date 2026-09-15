# Torque Wrench Extension Calculator 🔧

Adjust a torque wrench setting when a **crowfoot or extension** is used in line with the handle, so the fastener still gets the target torque.

**[Open the app →](https://awictor.github.io/torque-extension/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
set wrench to = target × L ÷ (L + E)
```

**L** = wrench length (pivot to handle center), **E** = extension length in line with the handle. The extension lengthens the lever, so the fastener sees more torque than the dial shows — dial down to compensate. A crowfoot at 90° to the handle needs **no** adjustment.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
