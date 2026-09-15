# Catena

**Stretch a soap bridge between two rings until it necks down and snaps.**

Catena is a single-file, zero-dependency canvas toy that simulates a real soap
film stretched between two coaxial rings — a *catenoid*, the surface of
revolution of a catenary. Pull the rings apart and the film solves its own
minimal-surface shape every frame, its waist thinning as you stretch it. Cross
the critical separation and the film loses stability, trembles, and snaps — with
a pop — leaving the rings bare. Bring them back together to re-form the bridge.

## Why it's cool

The math is real. Each frame it actually solves the minimal-surface equation
`R = a·cosh(H / 2a)` for the ring radius `R` and separation `H`, picks the stable
(fat-neck) branch, and draws that catenoid. The snap is a genuine bifurcation,
not a scripted animation: at `H/R ≈ 1.3255` the two catenoid solutions merge and
none survives (the *Goldschmidt* transition), so the film collapses to two flat
disks capping the bare rings. A live bifurcation inset plots both branches
merging into that fold with a dot tracking your current state. The surface is
shaded with thin-film interference — the oil-slick iridescence of actual soap.

## Run it

Open `index.html` in any modern browser. Double-click it, or drag it into a
tab. No server, no build step, no dependencies.

```
# optional, if you'd rather serve it
python -m http.server 8000   # then visit http://localhost:8000
```

## Controls

| Input | Action |
|-------|--------|
| **drag ↕** | pull the rings apart / together (resistance builds near the snap) |
| **drag ↔** | orbit the rig |
| **shift + drag ↕** | tilt |
| **wheel** / **two-finger pinch** | change ring radius |
| **space** / tap | wobble the film (it oscillates back) |
| **d** or the *demo* button | auto pull-to-snap-and-re-form loop |
| the *edge* button | show the critical-separation outline |
| **m** or the *sound* button | toggle the snap sound |
| **r** or the *reset* button | reset rings, tilt, and state |

The HUD shows the `H/R` ratio, waist radius `a/R`, distance to critical, film
area (surface energy), and a proximity-to-snap meter.

`prefers-reduced-motion` is honored: the drifting iridescence bands and
near-fold shiver freeze for motion-sensitive users.

## Share a configuration

Everything — ring radius, separation, tilt, orbit, and damping — round-trips
through the URL hash. Copy the URL at any point (say, one nudge before the snap)
and anyone who opens it lands on the same configuration.

```
index.html#R/H/beta/orbit/damping     e.g.  index.html#1.000/1.315/0.440/0.000/0.550
```

## The physics, briefly

A soap film minimizes area, so between two rings it forms a catenoid. For rings
of radius `R` separated by `H`, the waist radius `a` satisfies
`R = a·cosh(H / 2a)`. Writing `t = H/2a`, this is `cosh(t)/t = 2R/H`, which has
two roots (a stable fat neck and an unstable thin one) until they collide at the
minimum of `cosh(t)/t`, `t* ≈ 1.1997`. That fixes the critical ratio
`H/R = 2/min(cosh(t)/t) ≈ 1.3255`. Past it there is no catenoid at all — the
lower-energy configuration is the two-disk *Goldschmidt* solution, and the film
snaps to it.

## License

MIT — see [LICENSE](LICENSE).
