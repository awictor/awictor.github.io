# Standstill

**A bullet-hell where time only moves when you do.**

Hold still and the entire screen freezes mid-air — bullets, sparks, everything hangs in a dim, desaturated hush. Move your ship and the world snaps back to full color and races forward. The catch: standing frozen is safe but earns nothing. Points only pour in while time is flowing, so you're forced to dive *through* danger instead of hiding from it.

## Why it's cool

The "time moves when you move" hook is legible in one sentence and feels good the first time you freeze a wall of bullets and thread through it. But the scoring flips the usual freeze-to-hide instinct on its head: you score by **grazing** — sliding a hair's breadth past live bullets for an escalating combo — and a **dread** meter fills whenever you camp, waking a homing seeker that hunts you *only while you're frozen*. Stillness is never safe for long. It's a chill sandbox and a tense score-chaser in one self-contained file.

## Features

- **Motion-gated time** — global timescale ramps from 0 (frozen, dim, desaturated) to 1 (full color, motion streaks) based on your instantaneous speed, with a deadzone and smoothstep easing so freezing feels deliberate, not twitchy.
- **Graze scoring** — near-misses on live bullets award escalating combo points with spark bursts, screen shake, and a rising-pitch WebAudio combo ladder.
- **Shatter fast bullets** — graze a bullet moving above the speed threshold while time is flowing and it bursts into score shards.
- **Dread meter + homing seeker** — staying still fills dread and spawns a seeker that only chases while you're frozen. No camping.
- **OVERDRIVE** — sustain speed to fill the Flow meter and trigger a decaying double-points state with a rainbow trail and border glow.
- **Escalating waves** — radial bursts, aimed volleys, spirals, and fast snipers unlock as you accumulate flow-time, with telegraphed CRESCENDO mega-bursts on even-wave milestones.
- **Deterministic seeded runs** — a mulberry32 seed drives every pattern and the sim runs on a fixed timestep, so the same seed reproduces the same run. The seed lives in the URL hash for shareable, head-to-head challenges.
- **Local high score**, instant restart, and a `prefers-reduced-motion` mode that dials back shake and flashes.

## Run it

No build step, server, or network needed. It's a single self-contained HTML file.

- Double-click `index.html`, or drag it into any modern browser.

To play a specific shareable seed, add `#` and a number to the URL, e.g. `index.html#1234`. Opening with no hash picks a random seed and writes it to the URL so you can copy and share it.

## Controls

| Action | Input |
|---|---|
| Move | Mouse, or `WASD` / arrow keys |
| Start / restart | Click **PLAY**, or press `Enter` / `Space` |

Whichever device you used last owns movement — jiggling the mouse won't fight your keyboard, and vice versa.

## How to play

- Move to make time flow; you only score while it's flowing.
- Graze bullets — pass just outside them — to build combo and points. Grazing fast bullets shatters them for bonus shards.
- Don't camp. The dread meter fills while you're still and eventually wakes a seeker that hunts you only while frozen.
- Keep your speed up to hit OVERDRIVE and double your points.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
