# Flue Size 🔥

Size a **masonry chimney flue** from the fireplace opening — the minimum flue area and the round liner to buy. Single HTML file, fully offline, nothing leaves your device.

## Why

A flue that's too small smokes into the room; one that's too big cools the gases and drafts poorly — bigger is genuinely not better here. The proportioning rule (a fraction of the opening area) is simple but easy to misapply across round vs. square liners. This does it and rounds to a size you can actually order.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/flue-size/
- Enter the **fireplace opening** width and height in inches.
- Pick the **liner shape**.
- Read the recommended round liner diameter, plus the opening area and minimum flue area behind it.

## How it works

- Minimum flue area = fireplace opening area ÷ the ratio for your liner: **1/12** round, **1/10** square, **1/8** short/exterior chimneys.
- That area is converted to a round diameter and rounded **up** to the next standard liner (6, 7, 8, 10, 12, 15, 18, 20, 24″).
- Round liners draft better than square, so they're allowed a smaller area for the same opening.
- Rule-of-thumb only — follow NFPA 211, and factor in chimney height and offsets.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
