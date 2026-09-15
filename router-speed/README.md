# Router Bit Speed 🪛

Find the **maximum safe router RPM for a bit diameter** and check the rim speed. Big bits must spin slower. Single HTML file, fully offline, nothing leaves your device.

## Why

A router bit's cutting edge moves far faster than the shaft, and rim speed scales with diameter × RPM. Run a big panel-raising bit at full 24k and the edge hits dangerous speeds — burning, chatter, and in the worst case a bit that lets go. This gives the safe max and shows the rim speed so you can see why.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/router-speed/
- Enter the **bit diameter**.
- Optionally enter **your router's RPM** to check the rim speed.
- Read the recommended maximum RPM and the rim speed (ft/min and mph), with a warning if you're over.

## How it works

- Rim speed = π × diameter × RPM.
- Guide: up to 1″ run 24k, 1–2″ 18k, 2–2.5″ 16k, 2.5–3.5″ 12k, over 3.5″ 10k RPM.
- Only variable-speed routers can slow down; single-speed routers (~24k) shouldn't run bits over ~1.25″.
- Always follow the bit manufacturer's stamped maximum RPM — it overrides any rule of thumb.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
