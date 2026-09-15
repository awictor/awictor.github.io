# Epicycle

**A pocket orrery that draws the secret geometry hidden between two planets.**

Epicycle is a single HTML file — no build, no dependencies, no network calls. The
Sun and eight planets orbit on their real relative periods, animated at an
adjustable time speed with a scrubbable date. Heliocentric positions come from a
compact mean-longitude + Kepler-equation solver seeded with J2000 orbital
elements, so on any given date the planets sit roughly where they actually are.

## Why it's cool

Pick any two bodies and turn on **Weave mode**: Epicycle draws the line connecting
them every frame and lets the chords accumulate. Because the planets' periods are
in near-resonance, those chords trace out the famous orbital rose curves — the
five-petal **Earth–Venus pentagram** that closes over 8 years, the Earth–Mars
near-loop, the slow Jupiter–Saturn triangle, and dozens more. It turns dry
ephemeris math into a hypnotic spirograph you can steer through time and share as
a link.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it onto a
browser window. That's the whole install.

```
# or serve it, if you prefer a local http:// origin
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Controls

**Bottom strip**
- Play / pause, reverse (⇄), and jump to today (◎).
- `speed` — days simulated per real second.
- `weave` toggle + two dropdowns to pick bodies **A → B**.
- `trail` — length of the per-planet fading trails (0 = off).
- `rings` / `labels` toggles, and `↓ PNG` to save the current view (the date, body
  pair, and the log-scale/J2000 caption are burned into the exported image).

**Direct manipulation**
- Click any planet on the canvas to set the weave pair — first click sets A, next
  click sets B, and so on.

**Preset gallery** (top-left) — one-click curated views: Venus pentagram,
Earth–Mars loop, Jupiter–Saturn, Mercury–Venus. The active preset stays
highlighted until you drift off it.

**Keyboard**

| Key | Action |
|-----|--------|
| `space` | play / pause |
| `←` `→` | slower / faster |
| `r` | reverse time |
| `w` | toggle weave |
| `t` | jump to today |

## Shareable permalinks

Every meaningful bit of state lives in the URL hash and updates as you play, so
any view is a copy-paste-able deep link. Hash schema:

```
#d=<julian day>&s=<speed days/sec>&a=<bodyA idx>&b=<bodyB idx>
 &t=<trail len>&w=<weave 0|1>&r=<rings 0|1>&l=<labels 0|1>&p=<playing 0|1>&g=<dir ±1>
```

Body indices are `0=Mercury … 7=Neptune`. Out-of-range indices in a pasted link
are wrapped into range rather than crashing.

## The math (and its limits)

Each planet's heliocentric angle is found by advancing its J2000 mean longitude by
mean motion, then solving Kepler's equation `M = E − e·sin E` for the eccentric
anomaly (Newton's method, a few iterations) and converting to true anomaly. Orbital
elements (semi-major axis, eccentricity, mean longitude, longitude of perihelion)
are the standard J2000 values.

Two honest caveats, also noted on-screen:

- **It is an approximation, not an ephemeris.** Orbital inclination is ignored
  (everything is projected flat) and the elements are held fixed, so positions
  drift by degrees over centuries. Great for a toy and for seeing resonance;
  don't point a telescope with it.
- **Radii are log-scaled**, so all eight planets fit on one screen. On-screen
  distances are not to scale.

## License

MIT © 2026 Alex Wictor
