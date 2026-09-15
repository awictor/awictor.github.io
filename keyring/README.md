# Keyring

**Watch consistent hashing keep your keys in place when nodes come and go.**

Keyring is a single self-contained HTML file that draws the consistent-hashing ring
and animates what actually happens when a server joins or dies. Add or kill a node and
only the keys between it and its neighbour migrate — everyone else stays put. Flip on the
naive-modulo comparison and watch that same change reshuffle almost everything.

## Why it's cool

Consistent hashing is the algorithm behind sharded caches (Memcached/Redis clusters),
Cassandra/Dynamo partitioning, and CDN load balancing — the thing every backend engineer
is told to "just know" but almost nobody has actually watched happen. Keyring turns the
whiteboard diagram into something you can poke: the 32-bit hash ring is a circle, nodes
hash to points around it, and every key walks clockwise to the next node. Kill a node and
you literally see which keys move — and a live scoreboard tallies how many keys consistent
hashing spared versus naive `hash % N`.

No build step, no dependencies, no network calls. One file.

## Run it

Open `index.html` in any modern browser:

- Double-click the file, or drag it into a tab, or
- serve the folder if you prefer a real origin: `python3 -m http.server` then visit
  `http://localhost:8000/`.

That's it — there is nothing to install.

## Controls

**Guided scenarios**
- **+ Add node** — a new node joins; only the keys in its arc migrate (disabled at 10 nodes).
- **Node fails** — a random node drops; its keys walk clockwise to the next node (disabled at 1 node).
- **Hot shard / rebalance** — bumps virtual nodes up so replicas smooth a lumpy load; watch imbalance fall.
- **Reshuffle seed** — same algorithm, brand-new ring layout, fully reproducible from the URL.

**Topology sliders**
- **Nodes** (1–10) — physical servers on the ring.
- **Virtual nodes** (1–40) — replicas per node; more replicas → smoother load distribution.
- **Keys** (4–60) — number of keys placed on the ring.
- **Run 2,500 keys** — floods the ring to reveal the steady-state load histogram.
- **Show virtual-node replicas on ring** — overlays faint same-colour ticks for each replica.

**Readouts**
- **Keys remapped (consistent vs naive modulo)** — churn from the last topology change.
- **Load balance / imbalance (CoV)** — per-node key counts as bars plus the coefficient of variation.
- **Cumulative churn this session** — running totals for both strategies and an "N× more" verdict.

**Sharing & reset**
- **Copy share link** — copies the current URL (full state) to your clipboard.
- **Reset** — restores the defaults (seed 1337, 4 nodes, 3 virtual nodes, 24 keys).

## Shareable state

The full demo state — seed, node list, virtual nodes, key count, and overlay toggle —
serializes to the URL hash. Copy the link and whoever opens it sees the exact same ring.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
