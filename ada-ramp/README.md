# ADA Ramp Calculator

Size a wheelchair ramp: the **run needed** for a given rise at the ADA 1:12 slope, the **total ramp length**, and a **compliance check**.

**[Open the tool →](https://awictor.github.io/ada-ramp/)**

- Run needed = rise × slope ratio (ADA default 1:12)
- Ramp length (hypotenuse) and slope percent
- Pass/fail against the ADA 1:12 maximum
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 30″ porch rise needs a 30 ft run at 1:12 — a ramp board about 361″ long. A 1:10 slope fails the ADA maximum.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
