# Cheese Rennet 🧀

How much **rennet to add to a batch of milk** by rennet type, with drops and a set-strength adjustment. Single HTML file, fully offline, nothing leaves your device.

## Why

Rennet dosing is small and easy to get wrong — too little and the curd never sets, too much and it turns bitter. The right amount scales with milk volume and depends on whether you're using single- or double-strength liquid, or tablets. This does the conversion and gives you drops.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/cheese-rennet/
- Enter the **milk volume**.
- Pick the **rennet type**.
- Adjust **set strength** (up for firmer curd, down for soft styles).
- Read the dose, drops (for liquid), and the base 100% amount.

## How it works

- Single-strength liquid ≈ 0.25 ml/L (1 ml per 4 L); double-strength is half.
- Tablets ≈ one per 19 L, shown as a fraction of a tablet.
- Strength scales the dose linearly.
- Dilute liquid rennet in cool, non-chlorinated water before stirring gently into the milk. Follow your rennet's label — potency varies by brand and age.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
