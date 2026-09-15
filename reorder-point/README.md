# Reorder Point & Safety Stock Calculator

Calculate the **reorder point** and **safety stock** for inventory from daily demand, lead time, demand variability, and service level.

**[Open the tool →](https://awictor.github.io/reorder-point/)**

- Demand during lead time, safety stock, and reorder point
- Service levels 90% / 95% / 98% / 99% (service factor Z)
- Safety stock scales with the square root of lead time
- Dark mode, 100% offline, no dependencies, no tracking

## Example

20 units/day, 4-day lead, σ=10, 95% service → 80 in lead time + 33 safety = reorder at ~113 units. Great for FBA and e-commerce restocking.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
