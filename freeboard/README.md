# Freeboard

**A two-way buoyancy sandbox: drop hulls into a living water surface and watch them bob, heel, self-right, and sink.**

Freeboard is a single HTML file, zero dependencies, no build step. Open it and you get a tank of water that actually behaves like water — a live wave field that the floating boxes push on, and that pushes back.

## Why it's cool

Most water toys fake the physics. Freeboard runs a real (if compact) one:

- The water is a **1-D shallow-water height field** — a row of ~220 coupled columns with height and velocity that propagate genuine travelling and reflecting waves.
- The hulls are **rigid boxes with true mass, linear and angular momentum**, floated by sampling the submerged area under each one and applying Archimedean lift at the submerged centroid. That produces a correct **righting torque**, which means **metacentric stability you can feel**: shove a tall thin box and it capsizes, widen it and it stubbornly self-rights, over-densify it and it glugs to the floor leaving a spreading ring of ripples.
- The coupling is **two-way**: a hull's submerged motion drags the water columns (making its own wake), and the resulting waves rock and lift the hull in return.

It reads as a small physics engine, not a gimmick — in under 300 lines of vanilla JS.

## Run it

Open `index.html` in any modern browser. Double-click it, or serve the folder statically:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

No network, no dependencies, nothing to install.

## Controls

**Spawn** a hull, then poke the tank:

| Interaction | How |
|---|---|
| Select / drag / fling a hull | Click and drag it. Hold it underwater and release to watch it breach. |
| Make waves | Click (slap) open water. |
| Pour ballast | Select a hull, hit **Pour ballast** — adds topside mass, raising the centre of mass so a stable raft rolls. |

**Spawn palette:** Wide raft (self-rights), Tall tower (capsizes), Dense ballast (sinks), Cork (bobs high). Each seeds a characteristic shape *and* density.

**Scenes:** Regatta, Rogue wave, Overloaded barge — one-click setups. **Reset** empties the tank and returns physics to defaults.

**Physics sliders (all live):**

- **Gravity** — global g.
- **Fluid density** — how buoyant the water is.
- **Hull density** — sets the density of the next spawn, and re-densifies the selected hull live (drag it and watch the hull rise or sink).
- **Wave stiffness** / **Wave damping** — how springy and how lossy the water surface is.
- **Wind** — a horizontal force on the exposed freeboard that heels the hulls.

**Stability meter** (toggle) draws the centre of buoyancy (B), centre of mass (G) and metacentre (M) on the selected hull, plus a live heel / capsize readout. **Day** toggles a light theme.

## Share

The full scene — every hull's position, size, density, angle and ballast, plus all physics params and the theme — is serialized into the URL hash. Hit **Share** to copy the link; anyone who opens it gets the exact scene back. Positions are stored size-independently (x as a fraction of width, y as an offset from the waterline), so a scene composed on a wide monitor still lands on-screen on a phone. Malformed or hand-edited hashes are validated and clamped rather than breaking the sim.

## The physics, briefly

- **Buoyancy** — each hull is sampled on a 7×4 grid; each submerged sample contributes `ρ_fluid · g · dA` of upward force at its location, integrated into net force and torque about the centre of mass. This is Archimedes' principle applied piecewise, which is why rotation and partial submersion come out right.
- **Stability** — because lift acts at the *submerged* centroid (B) while weight acts at the centre of mass (G), a heeled hull generates a torque that either rights it or rolls it over, depending on where the metacentre (M) sits relative to G. Wide hulls have a high M and self-right; tall or top-heavy hulls capsize.
- **Two-way coupling** — submerged hull motion injects velocity into the water columns beneath it; the wave field integrates that into wakes and swell that feed back onto every hull.
- Runs at 4 fixed sub-steps per frame with clamped forces so the feedback loop stays stable.

## License

MIT — see [LICENSE](LICENSE).
