# Shearline

A physically honest pin-tumbler lockpicking sim — feel the binding order, set the pins, beat the spools.

## Why it's cool

Almost every browser "lockpick minigame" fakes it with a spinning dial. Shearline models the actual reason pin-tumbler locks are pickable: manufacturing tolerances make pins **bind one at a time in a hidden order**, and you exploit that with a tension wrench and a pick. Apply light tension, find the pin that's currently binding, push it to the shear line until it clicks and the plug rotates a hair, then hunt the next one. Overset a pin and it blocks the core; too much tension and nothing will set. Harder locks add spool, serrated, and T-pins that give convincing false sets, forcing the classic "back off tension" recovery.

It's one HTML file, zero dependencies, no assets — all rendering is a live canvas cutaway and every sound is synthesized with the Web Audio API.

## Features

- **True binding-order mechanics** — each pin binds based on per-pin randomized tolerance, not left-to-right. You have to probe to find the active pin.
- **Live tension gauge with a sweet spot** — too little tension and set pins drop; too much and the binding pin can't reach the shear line. The band narrows on harder tiers.
- **Security pins** — spool, serrated, and T-pins produce false sets and plug counter-rotation, with an on-screen coach prompting you to ease tension and clear the ledge.
- **Tactile feedback** — per-pin resistance and wobble animation, distinct Web Audio cues (click on set, thud on overset), plus optional gamepad rumble.
- **Cutaway renderer** — real-time side view of plug, driver/key pins, springs, and the shear line, rotating as you set pins.
- **Procedural seeded locks** — pin count, bittings, binding order, and spool placement all derive from a seed in the URL hash, so any lock is a shareable link. Includes a date-seeded "Lock of the Day."
- **Shareable challenges with a ghost par** — a shared win link encodes your best time, so friends racing the same pin stack see a Beat/miss comparison on the win card.
- **X-ray crutch that fades** — an optional overlay reveals the binding pin and numbered binding order; it auto-fades as you set pins and shrinks per difficulty (toggle auto / on / off).
- **Four difficulty tiers** — Cozy (3 clean pins) through Cruel (7 pins, multiple spools, serrated + T-pin, tight tension band).

## Run it

No build, no server, no network. Just open the file:

- Double-click `index.html`, or
- From a terminal: `start index.html` (Windows) / `open index.html` (macOS) / `xdg-open index.html` (Linux)

Any modern browser works. To jump straight to a specific lock, append a hash — e.g. `index.html#cruel-abc123` or `index.html#daily-tricky-d5k2`.

## Controls

**Mouse / touch**
- Hover a pin to select it; **hold** on a pin to push it.
- **Drag** the tension gauge (right side) up/down to set tension — or scroll the wheel anywhere on the canvas.

**Keyboard**
- `←` / `→` — move the pick between pins
- `Space` / `↑` — hold to push the selected pin
- `W` — add tension · `↓` — ease tension
- `X` — cycle X-ray (auto / on / off)
- `R` — reset the current lock · `N` — new random lock

## How to pick a lock

1. Apply light tension into the green sweet-spot band.
2. Push pins to find the one that resists — that's the binding pin (the X-ray hint helps at first).
3. Push it to the shear line until it clicks and sets. The plug rotates slightly.
4. Hit a false set (a spool/serrated/T-pin catching on a ledge)? Ease tension into the lower band to drop past the ledge, then push again.
5. Set every pin to open the lock. Don't overset — pushing past the shear line thuds and blocks the core until you back tension off.

## License

MIT — see [LICENSE](LICENSE).
