# Weight & Balance ⚖️

Compute an aircraft's **total weight, center of gravity, and envelope status** — the pre-flight weight-and-balance check, in one screen. Single HTML file, fully offline, nothing leaves your device.

## Why

Loading matters as much as weight: the same 2,400 lb can be perfectly safe or dangerously tail-heavy depending on where it sits. Every flight needs this computation, and the moment arithmetic is easy to fat-finger on a kneeboard. This does it and tells you plainly whether you're inside the envelope.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/weight-balance/
- Enter each **station's weight and arm** — empty aircraft, seats, fuel, baggage.
- Set your **forward/aft CG limits** and **max gross weight** from the POH.
- Read the CG, total weight and moment, and a clear "within envelope" / "too far forward/aft" / "over max gross" status.

## How it works

- Moment = weight × arm (distance from the datum). CG = total moment ÷ total weight.
- The CG must fall between the forward and aft limits, and weight must stay at or under max gross.
- Too far forward loads the elevator; too far aft risks instability.
- Arms come from your aircraft type's loading chart — enter your tail number's current empty weight.

This is a planning aid; always use the official weight-and-balance data for your aircraft.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
