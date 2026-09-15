# RAID Calculator

Calculate **usable capacity**, **storage efficiency**, and **fault tolerance** for RAID 0, 1, 5, 6, and 10 arrays from disk count and size.

**[Open the tool →](https://awictor.github.io/raid-calc/)**

- RAID 0 / 1 / 5 / 6 / 10 usable capacity and efficiency
- How many disks each array can lose
- Validates minimum disk counts and RAID 10 even-disk rule
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Four 4 TB disks in RAID 5 give 12 TB usable (75% efficiency) and survive one failure. Base-10 TB; your OS may report slightly less in TiB.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
