# Fall Factor 🧗

Compute a climbing **fall factor** and the estimated **peak rope impact force** from fall length, rope out, and climber weight. Single HTML file, fully offline, nothing leaves your device.

## Why

The scariest thing about fall factor is how unintuitive it is: a short fall onto little rope can hit harder than a long screamer on lots of rope, because the force depends on the *ratio*, not the height. This makes that visible — useful for teaching belay theory, understanding via-ferrata risk, and appreciating why you don't want factor-2 falls onto the anchor.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/fall-factor/
- Enter the **fall length** and the **rope paid out**.
- Enter **climber weight** and the **rope modulus** (≈22 kN for a typical single dynamic rope).
- Read the fall factor, a severity label, and the estimated peak impact force in N and kN.

## How it works

- Fall factor = fall length ÷ rope out, from 0 to 2 in normal climbing.
- Peak force ≈ mg + √((mg)² + 2·mg·R·f), treating the rope as a spring of modulus R.
- More rope out means more stretch to absorb the fall — a softer catch and lower force.
- Idealized model for learning; real forces depend on knots, belay slippage, friction, and rope age.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
