# Drover

**Herd a living flock into the pen — but push too hard and it panics.**

Drover is a single-screen arcade score-chaser built on real boids flocking. Your
cursor is a sheepdog: the flock flees from it with genuine separation / alignment /
cohesion behavior, so you never move sheep directly — you apply pressure and read
the emergent herd. Sweep wide arcs to steer the flock into a glowing pen before the
wave timer runs out.

## Why it's cool

The twist is the **panic mechanic**. Crowd the flock too fast or too close and each
boid's panic meter spikes — panicked boids abandon cohesion, bolt, and scatter your
herd. That flips the usual "push harder" instinct into a risk/reward loop: patient,
gentle arcing beats brute force. It feels alive because it *is* a flocking
simulation — you're negotiating with emergent behavior, not chasing scripted dots.

One file, no dependencies, no build step, no network. The whole sim is ~230 lines of
canvas JavaScript.

## Features

- **Real boids flocking** (separation / alignment / cohesion) for 60–140 agents,
  kept fast with a spatial-hash grid for neighbor queries.
- **Cursor-as-sheepdog** radial pressure model with a visible influence ring — you
  steer indirectly, never directly.
- **Panic system**: per-boid panic rises with proximity, over-speed, and hawk
  presence, and decays when calm. Panicked boids stop cohering and bolt.
- **Bark** (SPACE): a high-pressure burst on a cooldown — shoves the flock hard but
  spikes panic. Use sparingly.
- **Wave / pen loop**: deliver the flock to the pen before the timer.
  `score = delivered × calmness multiplier × combo streak`. Clear ≥60% to keep your
  streak; a perfect intact herd scores biggest.
- **Escalating hazards**: pens drift and a roaming hawk-shadow spikes panic in a
  radius, forcing route planning. Waves ramp flock size and hazard speed.
- **Seeded, shareable layouts**: the seed and wave live in the URL hash
  (`#s=<seed>&w=<wave>`), so the flock spawn, pen position, and hawk path reproduce
  for anyone who opens the same link. Copy the replay link from the scorecard.

## Run it

No install, no build, no server required.

- **Double-click** `index.html` to open it in any modern browser, **or**
- Serve the folder statically and open it, e.g.:

  ```sh
  python3 -m http.server 8080
  # then open http://localhost:8080/index.html
  ```

Serving over `http://localhost` (or `https://`) enables one-click "Copy replay link";
on the `file://` double-click path the scorecard shows the link for you to copy by
hand instead.

## Controls

| Input | Action |
|-------|--------|
| **Move cursor onto the field** | Start the wave (the timer waits until you engage) |
| **Move cursor** | Sheepdog — the flock flees the pressure ring; steer with wide arcs |
| **SPACE** | Bark: hard shove on a short cooldown, but spikes panic |

Read the herd-calm meter (top right): a calm, intact delivery multiplies your score;
a frazzled trickle resets your combo. Gentle beats brute force.

## Notes on determinism

A given `#s=<seed>&w=<wave>` produces the same starting layout every time: flock
spawn positions, pen placement, and the hawk's path are all driven by a seeded RNG
(mulberry32), as is the panic-bolt jitter. Your inputs and display refresh rate still
shape how each run actually plays out — this is a share-the-scenario feature, not a
frame-perfect input recording.

## License

MIT — see [LICENSE](LICENSE).
