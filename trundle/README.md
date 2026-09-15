# Trundle

**A hand-drawn gravity marble sandbox — sculpt ink tracks, pour marbles, watch them cascade.**

Draw a squiggle on the black slate and it instantly becomes solid geometry. A spout at the top pours a steady stream of marbles that roll, bounce, spin, and pile up along whatever funnels, ramps, loops, and catch-bins you've drawn. Drag the compass to tilt gravity and the entire cascade reroutes live.

One file. Zero dependencies. Works offline.

## Why it's cool

Every stroke you draw is real collision geometry, so building a contraption is as fast as sketching one. Marbles carry actual angular velocity — friction on contact spins them up, and a rotating spoke on each marble lets you *see* rolling vs. sliding. Tilt gravity and a static drawing turns into a live Rube-Goldberg machine. Your whole contraption plus its settings serialize into the URL, so a single link replays the exact machine you built.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's it. No build step, no server, no install.

A demo contraption loads on the first frame so marbles are already falling.

## Controls

**Tools** (top-left panel)

- **Draw** — freehand drag to lay down ink tracks (solid collision geometry).
- **Erase** — click/drag to remove strokes, see-saws, bins, or faucets near the cursor. A dashed ring shows the erase radius.
- **Faucet** — click to place an extra marble emitter.
- **See-saw** — click to drop a spring-loaded pivot plank that tilts under marble load.
- **Bin** — click to place a catch-bin that counts the marbles it collects.

**Compass** (top-right) — drag to rotate the gravity vector; the cascade reroutes instantly. **Double-click** to snap gravity back to straight down.

**Sliders** — gravity strength, restitution (bounciness), friction, marble radius, spawn rate, trail length, and marble cap.

**Actions**

- **Clear** — wipe the whole contraption.
- **Pause / Play** — freeze or resume the simulation.
- **♪ On / Off** — toggle the optional impact/settle audio.
- **Share** — copy a replay link. The full contraption and settings are encoded in the URL (URL-safe, survives Slack/email), so opening the link rebuilds the exact machine.

**Demos** — four starter contraptions: Funnel loop, Switchbacks, Sorter, Cascade bins.

## How it works

- Canvas render loop with a sub-stepped velocity integrator (substep count adapts to marble speed to avoid tunneling through thin tracks).
- Circle-vs-capsule collision against every drawn segment, with restitution, tangential friction, and friction-induced spin.
- Capped O(n²) marble-marble resolution (bounded by the marble-cap slider).
- Strokes are quantized and simplified on commit, then base64-encoded into the URL hash for one-link replay.

## License

MIT — see [LICENSE](LICENSE).
