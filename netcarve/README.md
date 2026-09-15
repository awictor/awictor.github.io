# Netcarve

**Paste a CIDR, watch the address space light up bit-by-bit — and carve it into subnets.**

Netcarve is a single-file IPv4 subnet calculator built around one idea: make the 32 bits of an address *visible and draggable*. No build step, no dependencies, no network calls — one HTML file you open and pin forever.

## Why it's cool

Most subnet calculators are dead form fields. Netcarve turns the mask into something tactile: grab the boundary between network and host bits and drag it, and the whole address space reflows under your hand. It teaches CIDR while doing real work — and the carve table plus shareable hash links make it a genuine daily driver.

## Features

- **Smart parse** — accepts a CIDR (`10.0.0.0/24`), a host + prefix (`192.168.1.5/26`), or a bare IP (`172.16.5.9`). Host-bits-set input is normalized to the true network address and flagged with a badge.
- **Full readout** — network, broadcast, first/last usable host, usable + total host counts, netmask, wildcard mask, hex, and binary. Every value is click-to-copy.
- **Interactive 32-bit grid** — octet-grouped bit cells with a draggable network/host boundary. Drag it, click a bit, arrow-key it, or use the slider / +/- buttons; every field recomputes live. Works with mouse, touch, and pen.
- **Three carve modes** —
  - *Split into N* equal subnets
  - *To prefix* — carve down to a target `/N`
  - *VLSM pack* — paste required host counts (`50, 20, 10, 2`) and get optimally-sized, aligned, non-overlapping children, largest first
- **Address-space map** — a proportional minimap renders each carved child as a colored segment, with a live marker for the containment IP.
- **Containment check** — type any IPv4 address for an instant in-range / out-of-range verdict plus its offset within the block.
- **Reserved-range awareness** — badges RFC1918 private, loopback, link-local, CGNAT, multicast, and other reserved ranges on both the parsed block and the tested IP.
- **Export** — copy the carve table as CSV, JSON, or Markdown, or copy the whole readout at once.
- **Shareable state** — the parsed block, carve plan, and containment IP all live in the URL hash, so any view is a refresh-safe, bookmarkable permalink.

Correctly handles the edge cases: `/31` (RFC 3021 point-to-point, 2 usable), `/32` (single host), and `/0` (the whole space).

## Run it

Open `index.html` in any modern browser:

```
# double-click the file, or
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

No server, no install. State lives in the URL hash — copy the address bar to share a subnet plan.

## Controls

| Action | How |
|---|---|
| Parse input | Type an IP/CIDR and press Enter or click **Parse** |
| Change prefix | Drag the boundary in the bit grid, click a bit, use the slider, the **+/-** buttons, or focus the grid and press **← → ↑ ↓** |
| Carve | Pick a mode in the **Carve** dropdown; enter a count, target prefix, or host-count list |
| Test an IP | Type it into **Containment check** |
| Copy a value | Click any value in the readout |
| Export | Use **CSV / JSON / MD** in the carve card, or **Copy all** in the readout |
| Share | **Copy link** (also just copy the URL) |

## Scope

IPv4 only, on purpose — it keeps the math exact with plain 32-bit unsigned integers (`>>> 0`, no BigInt) and the whole thing in one small file. IPv6 is out of scope.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
