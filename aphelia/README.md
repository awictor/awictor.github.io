# Aphelia

**Seed a string, get a world.** Aphelia turns any text into a procedurally rendered exoplanet catalog card you can share and export — one self-contained HTML file, no build step, no network, no dependencies.

## Why it's cool

The same seed always produces the same world. A string is hashed into a PRNG that drives *everything* — the globe you see, the physics in the stat block, and the one-line flavor citation — so the picture and the numbers always agree. It feels less like random noise and more like discovering a real entry in some vast survey. Every world lives at a shareable URL hash, and "Export PNG" saves exactly what's on screen, so collecting and trading favorite seeds is the whole game.

## Features

- **Deterministic seed pipeline** — `xmur3` hash into a `mulberry32` PRNG; any seed reproduces the exact same world, forever.
- **Five rendered world archetypes** on a single canvas: banded gas giant, cratered rockball, ocean-cloud world, frozen ice world, and molten lava world — all sharing one sphere-shading routine (per-pixel limb darkening + a day/night terminator).
- **Seeded rings and 0–4 orbiting moons**, drawn in front of and behind the globe with an atmospheric limb glow and specular sun-glint on ocean/lava worlds.
- **An almanac stat block** derived from the same seed: radius, mass, surface gravity, day length, orbital year, mean temperature, atmosphere mix, star spectral class (tinted to its real-ish color), and biosignature odds — plus an auto designation (e.g. `APH-4471 b`) and a word-bank flavor citation, laid out in an engraved card frame.
- **Share + export** — whole-card PNG via `canvas.toDataURL`, a shareable `#seed=` URL that loads on open, and a recents strip that remembers worlds you've discovered (via `localStorage`).
- **Accessible + considerate** — visible keyboard focus rings, `role="img"` + a per-world `aria-label` describing the card, an `aria-live` status toast, and full respect for `prefers-reduced-motion` (renders a crisp static frame instead of animating).

## Run it

No build, no server, no install. Open the file:

```
# just double-click index.html, or:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

To load a specific world, append a seed to the URL:

```
index.html#seed=orion-7
```

## Controls

| Action | How |
| --- | --- |
| Discover the typed seed | Type in the box, press **Enter** or click **Discover** |
| Roll a new random world | Press **Space**, or click **Reseed** |
| Save the card as an image | **Export PNG** |
| Copy a shareable link | **Copy Link** (URL with the world's `#seed=`) |
| Reopen a past world | Click any thumbnail in the recents strip |

## How it works

Everything is derived from one hash. The seed string is run through `xmur3` to produce a 32-bit value, which seeds a `mulberry32` PRNG. That single stream picks the archetype, palette, star class, ring/moon config, and every physical stat; separate derived streams (`seed·n`, `seed·s`) drive the value-noise surface and the starfield so they stay stable across reseeds of the same string. The globe is painted as vertical scanlines mapped onto a sphere, with the archetype only swapping the per-pixel surface-color function. The whole card — frame, globe, rings, moons, and almanac — is one `<canvas>`, which is why the PNG export is pixel-identical to what you see.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
