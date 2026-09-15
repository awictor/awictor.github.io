# Soap Lye Calculator 🧼

Calculate the **lye (NaOH) and water** for a cold-process soap batch from oil weight, saponification value, and superfat. Single HTML file, fully offline, nothing leaves your device.

## Why

Get the lye wrong and you get a lye-heavy bar that burns skin, or a soft greasy one that never sets. The math is a simple SAP-value multiplication, but it's exactly the kind of thing you want double-checked before you handle caustic soda. This does it and shows the water and total batch weight too.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/soap-lye/
- Enter the **oil weight** in grams.
- Pick the **oil type** (its SAP value).
- Set the **superfat %** (5% is a common, gentle default).
- Set the **water:lye ratio** (2:1 is a safe default).
- Read the lye, water, and total batch weight.

## How it works

- Lye = oil weight × SAP value × (1 − superfat). Superfat leaves a little oil unsaponified for a milder bar.
- Water = lye × ratio; less water gives a harder, faster-tracing batch.
- SAP values here are single-oil averages — compute blends oil-by-oil and sum them.

**Safety:** always verify your exact recipe in a trusted lye calculator, weigh everything, and wear gloves and eye protection — lye is caustic.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
