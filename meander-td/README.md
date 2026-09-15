# Meander

**You don't defend a path — you draw one. Build the maze; make them walk.**

Meander is a single-file, zero-dependency maze tower-defense. Enemies spawn at an
inlet and pathfind to the exit across an open field. Every tower you place is also
a **wall**, so the maze you sculpt *is* your strategy: the longer and twistier the
route you force, the more time your towers get to fire.

## Why it's cool

Most tower-defense games hand you a fixed track and you just decorate it. Meander
inverts that — the enemies have no path until you make one. A glowing flow-field
re-solves (BFS) the instant you place, sell, or upgrade, so the core loop feels
like sculpting a river. The game refuses any placement that would fully wall
enemies off (red ghost preview), and a live **Detour meter** scores how much extra
distance your maze forces versus a straight shot, paying out bonus gold — so
elegant maze design is a score you can chase. Breachers chew your walls back open
and fliers ignore the maze entirely, keeping the sculpting tense.

Runs are deterministic from a seed, and the URL hash encodes the seed **and** your
full layout — so a share link loads your exact defense as a "beat my maze"
challenge.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder
statically:

```
python3 -m http.server 8000     # then visit http://localhost:8000
```

No build step, no dependencies, no network. Progress and best scores save to
`localStorage`.

Optional URL hash resumes or shares a run:

```
index.html#s=SEED&b=BUILD&m=shared
```

## How to play

Enemies spawn at **IN** and pathfind to **OUT**. Place towers to force a longer
route. You cannot fully wall the exit off — illegal placements show a red ghost.
Hovering shows a ghost preview of the *new* path and the detour bonus it earns.
Clear all 18 waves to win; you lose when lives hit zero.

### Towers

| Tower | Cost | Role |
|-------|------|------|
| Bolt   | 60  | Single-target sniper — reliable damage |
| Frost  | 70  | Slows enemies — brutal in long corridors |
| Arc    | 95  | Chain lightning across packed lanes |
| Mortar | 110 | Long-range splash — hits air **and** ground |
| Flak   | 85  | Anti-air only — shreds fliers |
| Pylon  | 18  | Cheap attackless wall — pure maze shaping |

Each combat tower has three upgrade tracks (range / damage / rate), and any tower
sells back for 70% of what you invested.

### Enemies

Runners, swarms, tanks, and shielded units walk the maze. **Breachers** chew
adjacent towers to re-open your walls; **fliers** ignore the maze entirely, so
keep anti-air (Mortar / Flak) in range.

### Controls

- **Left-click** — place selected tower / select an existing tower
- **Right-click** — sell the tower under the cursor
- **1–6** — pick a tower type
- **Space** — start the next wave
- **P** — pause / resume
- **H** — toggle the time-in-range heatmap
- **Esc** — deselect
- Speed controls: pause / 1× / 2× / 3×
- **?** (top bar) — reopen the how-to card

### Overlays

Toggle the flow field, time-in-range heatmap (coverage-seconds per tile, flags
dead corridors), and hover range in the sidebar.

## License

MIT — see [LICENSE](LICENSE).
