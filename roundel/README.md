# Roundel

**Spin the ring and feel why consistent hashing barely flinches when a server dies.**

Roundel is a single-screen, zero-dependency interactive explainer for consistent hashing — the trick that lets distributed caches, databases, and CDNs add or remove servers without reshuffling everything. Drop keys and nodes on a hash ring, watch each key snap clockwise to its owning node, then kill a node and see exactly how few keys have to move.

## Why it's cool

Consistent hashing is a rite-of-passage systems concept (memcached, Cassandra, DynamoDB, CDNs, load balancers) that everyone reads about but few *feel*. Roundel makes the payoff physical:

- **Kill a node on the ring** and only that node's keys animate over to their neighbour — a live counter proves the rest stayed put.
- **Flip to naive `mod-N`** and watch nearly every key recolor when a single server leaves. Same keys, same nodes — the difference is the whole point.
- **Drag the virtual-nodes slider** and watch a lumpy load histogram even out as replicas spread each server around the ring.

## Features

- **Interactive hash ring** — type a name and drop it as a key or a node; each is hashed (FNV-1a, 32-bit) to a ring position and rendered with a clockwise assignment arc colored by its owning node.
- **Live remap counter** — add or remove a node and see `keys moved: X / Y` tick up in sync with the animation, so only the affected arc migrates.
- **Naive mod-N contrast** — a `Ring` / `Naive mod-N` / `Side by side` toggle. Side-by-side shares one kill button: one small arc moves on the left while the whole ring reshuffles on the right.
- **Virtual-nodes slider (1–100)** — more replicas per node, drawn faintly around the ring, with a per-node load histogram plus live **balance score** and **load std-dev** readouts.
- **Try to break it** — `worst-case removal` and `kill busiest` challenges, `balanced` / `hotspot` presets, and a date-seeded `daily challenge`.
- **Keyboard stepping** — walk through built-in scenarios with the <kbd>&larr;</kbd> / <kbd>&rarr;</kbd> arrow keys.
- **Shareable scenarios** — every state (nodes, keys, replica count, mode) is round-tripped through the URL hash, so a specific "watch this" setup is a copyable link. Names are URL-encoded, so any characters survive the round trip.

## Run it

Open `index.html` in any modern browser. That's it.

```sh
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

No build step, no dependencies, no network calls. Everything is in one self-contained HTML file.

## Controls

| Action | How |
| --- | --- |
| Add a key / node | Type a name, click **+ key** or **+ node** (Enter adds a key) |
| Remove | **kill a node**, **− key**, or **reset** |
| Switch view | **Ring** / **Naive mod-N** / **Side by side** |
| Virtual nodes | Drag the **replicas** slider (1–100) |
| Break it | **worst-case removal**, **kill busiest** |
| Load a scenario | **balanced**, **hotspot**, **daily challenge**, or <kbd>&larr;</kbd> / <kbd>&rarr;</kbd> |
| Share state | **copy share link** (copies the current URL) |

## How the shareable hash works

State is serialized into `location.hash` as `#n=<nodes>&k=<keys>&r=<replicas>&m=<mode>`, with each node and key name individually URL-encoded (and decoded on read, with a fallback to the daily challenge if the hash is malformed). Copy the link, send it, and the recipient opens the exact same ring.

## License

MIT — see [LICENSE](LICENSE).
