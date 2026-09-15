# Wheel Offset & Backspacing Calculator 🛞

Convert between wheel **offset** (ET, mm) and **backspacing** (inches) from rim width and offset, plus front spacing — for fitting wheels to a car.

**[Open the app →](https://awictor.github.io/wheel-offset/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
offset (in)  = offset mm ÷ 25.4
backspacing  = width ÷ 2 + offset
front space  = width ÷ 2 − offset
```

Offset is measured from the wheel **centerline** to the hub face: positive tucks the wheel in, negative pokes it out. Backspacing is from the hub face to the inner lip; it and front spacing add up to the full width. Match offset to your car's spec so the tire clears struts and fenders.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
