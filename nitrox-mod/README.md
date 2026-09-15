# Nitrox MOD 🤿

Find a nitrox mix's **maximum operating depth**, the ppO₂ at depth, and the **best mix** for a planned depth. Single HTML file, fully offline, nothing leaves your device.

## Why

Enriched air buys you bottom time but caps your depth: dive a rich mix too deep and oxygen turns toxic. Every nitrox diver computes MOD before splashing, and "best mix" squeezes the most no-deco time from a planned depth. This does both without a table.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/nitrox-mod/
- Enter the **oxygen fraction** (e.g. 32 for EAN32).
- Pick your **max ppO₂** — 1.4 ATA working, 1.6 for deco/contingency.
- Enter a **target depth** to get the best mix for it.
- Read the MOD in metres and feet, the ppO₂ ceiling, and the recommended blend.

## How it works

- ppO₂ = O₂ fraction × (depth ÷ 10 + 1) in metres. Cap it at the limit and solve: **MOD = 10 × (ppO₂max ÷ FO₂ − 1)**.
- A richer mix has a shallower MOD — more oxygen means the toxic threshold arrives sooner.
- Best mix = ppO₂max ÷ (depth ÷ 10 + 1) — the richest blend that hits your limit exactly at the planned depth.

Planning aid only. Analyze every cylinder yourself and dive within your training and your tables or computer.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
