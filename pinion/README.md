# Pinion

**Drop gears, watch them mesh, flick the train and let the ratios cascade.**

Pinion is a zero-dependency, single-file gear sandbox that runs in any modern browser. Drop toothed gears on a canvas; any two whose centers sit at roughly the sum of their radii auto-mesh into a train. Pick a motor, spin it up, and angular velocity propagates through the whole meshed train with correct gear ratios — adjacent gears counter-rotate and speed scales inversely with size, so a fat driver crawls a tiny pinion into a blur.

## Why it's cool

Everyone recognizes gears, but almost no toy lets you *freely build* a meshing train and feel the ratios: a tiny motor pinion driving a huge slow wheel, a chain of idlers reversing direction down the line, a jammed loop that locks solid. Pinion renders teeth with the correct meshing phase so the interlock looks physically real, and it surfaces a genuine gear property — a closed loop with odd parity can't turn — as a red "jam lock" instead of glitching. It's a kinematic model, not a rigid-body sim, so it stays stable and fast.

## Features

- **Auto-meshing** — gears whose center distance ≈ r₁+r₂ connect into trains, recomputed live as you drag them around.
- **Kinematic ratio propagation** — BFS from the motor assigns angular velocity: counter-rotation at every mesh, speed inversely proportional to radius. No fragile collision sim.
- **Phase-correct teeth** — meshing gears' teeth visibly interlock and stay aligned as they turn.
- **Flick to spin** — drag a gear's rim to add angular velocity, or set a target RPM with the slider. Friction winds free-spinning trains down.
- **Jam detection** — over-constrained graphs (odd-parity closed loops, conflicting drives) lock the train to zero and flash red with a lock ring, mirroring real gearing.
- **Belt/chain drives** — link two distant gears (shift+drag) to transmit same-direction rotation, drawn as twin tangent lines.
- **Snap-to-mesh preview** — a translucent ghost and dashed rings show valid mesh partners while you place or move a gear; release snaps to the exact center distance.
- **Live HUD** — per-train RPM and reduction ratio, updated every frame. Optional WebAudio hum whose pitch/volume track the fastest gear (mutable, off by one click).
- **Presets + Randomize** — Gearbox (reduction), Idler (reversing chain), Planetary (cluster), plus one-click random rigs.
- **Shareable rigs** — the full layout (gear positions, tooth counts, motor, module, friction, RPM) serializes to the URL hash. Copy the link, send the rig.

## Run it

No build, no dependencies, no network. Either:

- **Double-click `index.html`** to open it in your browser, or
- Serve it statically, e.g. `python3 -m http.server` then open <http://localhost:8000/index.html>.

It loads the Gearbox preset by default; anything after `#` in the URL is a saved layout.

## Controls

Desktop (mouse + keyboard):

| Action | Control |
| --- | --- |
| Drop a gear | Click empty space |
| Move a gear | Drag its center |
| Flick-spin | Drag its rim |
| Set the motor | Double-click a gear |
| Link a belt | Shift + drag between two gears |
| Change tooth count | Scroll over a gear (or empty space to set the next drop) |
| Delete a gear | Hover it, press `Delete` / `Backspace` / `x` |

Panel sliders tune **module** (tooth size), **friction** (wind-down), **motor RPM**, and **new-gear teeth**. Buttons: Randomize, Clear, the three presets, and a speaker toggle to mute/unmute the hum (state persists).

**Touch devices:** you can drop, move, and flick-spin gears. Setting the motor, changing teeth, linking belts, and deleting rely on wheel/double-click/shift-drag/keyboard, so those are desktop-only for now — the on-screen legend says so on touch.

## How it works (in brief)

Each frame: build the mesh graph (plus belt edges), split into connected components, pick a root per component (the motor, else the fastest gear), drive/decay the root's ω, then BFS-assign ω to the rest — flipping sign at every mesh and scaling by the radius ratio. If BFS finds an inconsistent ω for an already-visited gear (an over-constrained loop), the whole train jams to zero. Rotations integrate, and meshing children snap to the nearest tooth phase from the invariant `Nₐ·θₐ + N_b·θ_b = const` so the teeth stay interlocked.

## License

MIT — see [LICENSE](LICENSE).
