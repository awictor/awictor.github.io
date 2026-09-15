# Crosswire

**Two sensors, two wheels, four emotions — watch personality emerge from wiring alone.**

Crosswire is a single-file, zero-dependency simulation of [Braitenberg vehicles](https://en.wikipedia.org/wiki/Braitenberg_vehicle). Each little two-wheeled agent has a left and right light sensor wired to a left and right motor. Flip the wiring from straight to crossed, and the sign from excitatory to inhibitory, and the *same* simple rule produces four unmistakable "personalities":

- **Fear** — flees light
- **Aggression** — charges and rams light
- **Love** — approaches and settles
- **Explorer** — drifts toward, loses interest, wanders on

## Why it's cool

Braitenberg's *Vehicles* (1984) is a beloved thought experiment about "synthetic psychology": the argument that complex, emotional-looking behavior can come from trivially simple wiring, not a complex brain. Almost nobody has actually *watched* the vehicles behave — they live on the page.

Crosswire makes it something you can poke. Flip one crossing toggle and a fleeing coward becomes a heat-seeking missile, with zero other changes. Fading motion trails make the darting, orbiting, cowering paths legible, and the whole scene round-trips through the URL hash so any arrangement is one link away.

## Run it

No build, no install, no network. Open `index.html` in any modern browser:

- **Double-click** `index.html`, or drag it into a browser tab, or
- serve the folder and visit it, e.g. `python3 -m http.server` then open `http://localhost:8000`.

On first visit it loads the **Ecosystem** scenario automatically.

## Controls

| Input | Action |
|-------|--------|
| **Click** empty space | Drop a glowing light |
| **Drag** a vehicle or light | Reposition it |
| **1 / 2 / 3 / 4** | Spawn Fear / Aggression / Love / Explorer |
| **F** | Toggle the light-field heatmap |
| **O** | Toggle sensor rays + per-wheel thrust overlay |
| **L** | Toggle living lights (drift, pulse, get consumed by Love) |
| **R** | Randomize the scene |
| **C** | Clear everything |
| **Copy link** | Copy a shareable URL of the exact current scene |

The control panel also has one-click **scenarios** (Timid, Aggressive, Lover, Explorer, Ecosystem) and live **sliders** for sensor gain, speed cap, sensor spread, trail life, and light brightness. Retune the swarm and watch fear turn into obsession in real time.

## How it works

Each vehicle samples a scalar light field at two sensors splayed ahead of its heading. The two readings drive two wheels through a differential-drive integrator. Two booleans per archetype decide everything:

- **crossed** wiring — does the left sensor feed the left wheel (straight) or the right wheel (crossed)?
- **inhibitory** sign — does more light speed a wheel up (excitatory) or slow it down (inhibitory)?

Those four combinations are Fear, Aggression, Love, and Explorer. The light field is placed lights (with `1/r²`-style falloff) plus a faint glow from every other vehicle, so agents also sense and react to each other. Full state — every vehicle's position/heading/wiring, every light, and all slider values — serializes to `location.hash` with rounded floats for short, shareable links.

Everything lives in one `index.html`: canvas + control markup, all CSS in a `<style>` block, and all logic in one `<script>`.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
