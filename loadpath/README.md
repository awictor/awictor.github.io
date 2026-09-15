# Loadpath

**Draw a truss, watch the forces flow, break it.**

A compact single-screen Verlet truss/stress sandbox. Draw a structure node-by-node on a snap grid, pin down supports, hang a load on it, and watch every beam light up with the axial force running through it — cool blues for tension, hot reds for compression. Overload a member and it snaps with a recoil, which can trigger a cascading collapse.

## Why it's cool

The load-path heatmap turns an abstract engineering idea into something you can see: forces route around a hole you cut, pile up on a single overloaded strut, then that strut snaps and the whole truss buckles. It's one zero-config screen, no dependencies, no build step — and any structure you draw serializes into the URL, so you can fork and share builds by copying a link.

Note: colors are a *visual* stress estimate derived from Verlet constraint length change (a strain proxy), not a true finite-element solve. It's built for intuition and play, not structural certification.

## Features

- **Draw-a-truss editor** — click empty grid points to place nodes, drag node-to-node to add beams, shift/right-click a node to pin it as a fixed support, right-click a beam to delete it.
- **Verlet physics core** — nodes are point masses under gravity; beams are iterative distance constraints. The stiffness slider maps directly to relaxation iterations.
- **Live load-path heatmap** — each beam is colored every frame by the sign and magnitude of its axial strain (tension = blue/cyan, compression = red/orange).
- **Breaking + cascade collapse** — beams whose strain exceeds the break threshold snap with a visible recoil, redistributing force and triggering chain-reaction failures.
- **One-click Stress Test** — ramps the load upward until the structure fails, then reports the load at collapse and the ordered sequence of members that snapped.
- **Replay** — after a collapse, replays the cascade in slow motion with white flash highlights on the failing members.
- **Support analysis** — a BFS from the pinned supports runs every frame; any node no longer connected to a support is tinted amber with a warning ring.
- **Flow particles** — optional dots stream along each beam, their speed and direction scaled by the axial force.
- **Shareable builds** — full state (node positions, beams, pins, load point, params) is serialized into the URL hash. Copy the link to share a build.
- **Starter gallery** — Warren truss bridge, cantilever, arch, and suspension deck, all built procedurally.
- **Live sliders** — gravity, stiffness, beam strength/break threshold, and load mass, plus Reset and Clear.

## Run it

No install, no build, no network. Just open the file:

- **Double-click `index.html`**, or drag it into any modern browser tab.

It boots into a seeded Warren-truss bridge in Run mode with the load path already lit up.

(If you paste a shared `#...` URL into the address bar, it loads that build instead.)

## Controls

**Edit mode** (toggle with the top-left button):
- Click an empty grid point → add a node
- Drag from one node to another → add a beam (a live length readout in grid units shows while you drag)
- `shift`-click or right-click a node → pin it as a fixed support
- Right-click a beam → delete it
- `ctrl`/`⌘`-click a node → set it as the load point

**Run mode:**
- Drag any node to poke the structure and watch the color field respond
- **Stress Test** ramps the load until collapse and reports the failure load + snap order
- **Replay** re-runs the last collapse in slow motion

**Sliders:** Gravity, Stiffness (relaxation iterations), Beam strength (break threshold), Load mass. **Share URL** copies the current build's link; **Reset** restores the loaded build; **Clear** empties the canvas for a fresh draw.

## License

MIT © 2026 Alex Wictor
