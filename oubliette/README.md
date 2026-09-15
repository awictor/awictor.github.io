# Oubliette

**A seed-driven tabletop dungeon generator, drawn like graph paper you'd actually run a session on.**

Type a seed, get a complete one-page dungeon rendered in wobbly ink on pale-blue quadrille: rooms carved by binary space partitioning, joined by right-angle corridors, punctuated with doors, a locked vault with its key placed on a reachable path, stairs up and down, hidden rooms behind dashed passages, and a boxed encounter key with a procedurally generated name. Everything is deterministic from the seed and lives in a single HTML file with zero dependencies.

## Why it's cool

- **It's a real artifact, not a debug view.** Hand-drawn wall jitter, stippled floors, a title cartouche ("The Sunken Warren of Vorrath · Level 3"), and a numbered legend — it reads like a page a GM could drop into tonight's game.
- **Solvable by design.** The treasure vault is always placed on a dead end of the connection tree, so its locked door only ever seals the vault itself. The key is placed in a room provably reachable from the entrance *without* crossing the lock. (If a floor is too small to have a safe dead end, it simply has no vault rather than an impossible one.)
- **Deterministic and shareable.** The full state — seed, size, density, danger, floor, view — lives in the URL hash. Copy the address bar to hand someone the exact same dungeon.
- **Multi-level.** Stairs down generate the next floor from a `(seed, level)` hash, so a dungeon is a connected stack you can walk with the level buttons.

## Run it

No build, no server, no install:

```
open index.html
```

Just double-click `index.html` (or drag it into any modern browser). That's the whole app.

## Controls

| Control | What it does |
|---|---|
| **seed** | The dungeon's fingerprint — same seed always draws the same map. Type your own or hit **⟳ reseed** for a random one. |
| **size** | Grid width in tiles (20–44). Bigger grid, bigger floor. |
| **density** | Rooms per floor (1–7). Higher splits the space into more, smaller rooms. |
| **danger** | Monster / loot / trap intensity and tier (1–5). |
| **◄ / ►** | Ascend / descend the floor stack. Descending generates the next connected level. |
| **GM view / Player view** | GM view shows everything. Player view hides secret rooms, traps, and the vault key — the map to show at the table. |
| **⭳ PNG** | Download a 2× print-resolution image of the current view. |
| **⭳ JSON** | Download a machine-readable legend (rooms, roles, encounters, doors) for VTT import. |

## Reading the map

```
▲ up   ▼ down   ❖ vault   ⚷ key   ☠ foe
$ loot   ※ trap   ═ locked door   · door   ⋯ secret passage
```

Rooms are numbered; the **Encounter Key** panel gives a one-line description of each — role, monsters, loot, traps, and stairs. Double-lined doors with a keyhole are locked; dashed openings are hidden passages.

## How it works

1. **PRNG** — the seed string is hashed and fed to a `mulberry32` generator, so every choice is reproducible.
2. **BSP** — the grid is recursively split; each leaf carves one room. Sibling partitions are joined with L-shaped corridors, forming a spanning tree in which every room is reachable.
3. **Placement** — entrance and exit go in the two most-separated rooms; the vault takes a dead-end leaf and gets a locked door; the key lands on the entrance side of that lock; 1–2 remaining leaves become secret rooms; roles and encounters are rolled from the danger tier.
4. **Render** — walls are drawn as jittered polylines, floors stippled, and the legend box is sized to its contents so nothing clips (the same layout is used for the PNG export).

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
