# Postern

**The chmod calculator that thinks in every direction** — grid, octal, symbolic, and `ls -l`, all in sync.

Postern is a single-file, zero-dependency Unix permission workbench. Edit *any*
representation of a file mode and every other one updates instantly. It renders
the exact `ls -l` line a shell would print, generates copy-ready `chmod`
commands, explains in plain English what each of owner/group/other can actually
do, and lints the mode for security foot-guns.

## Why it's cool

Everyone has re-googled "chmod 755 meaning" or reached for a one-way octal
calculator. Postern is the one you bookmark instead:

- **Bidirectional** — edit the grid, the octal field, the `ls -l` string, or a
  real symbolic `chmod` expression. There is no "input" and "output"; all four
  are live surfaces over one shared mode.
- **Real symbolic parsing** — it resolves expressions like `u+rwx,go-w,a+X,+t`
  the way `chmod(1)` does, including conditional `X`, permission copying
  (`g+u`), `=` clearing, and comma-clause ordering.
- **Correct `ls -l`** — proper `s`/`S`/`t`/`T` casing for setuid/setgid/sticky
  with and without the execute bit.
- **Safety linter** — flags `0777`, world-writable dirs without the sticky bit,
  setuid/setgid risks, sticky-on-a-file no-ops, and directories missing execute.
- **Shareable** — the full mode lives in the URL hash (e.g. `#d1777`), so any
  permission set is a link you can paste to a teammate.

Fully offline. No build step, no network calls, no tracking.

## Run it

Open `index.html` in any modern browser:

```sh
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

Or just double-click the file. That's it — there is nothing to install.

> Note on copy: `file://` is not a "secure context" in Chrome/Edge, so the
> async clipboard API may be unavailable there. Postern automatically falls
> back to a legacy copy path and only reports "Copied" when a copy actually
> succeeds. Serving over `http://localhost` avoids the fallback entirely.

## Usage

### The four surfaces

| Surface | How to edit |
|---|---|
| **Permission matrix** | Click any `r`/`w`/`x` cell to flip it; click the setuid/setgid/sticky cells for special bits. |
| **Octal mode** | Type `755`, `0644`, `4755`, etc. (1–4 octal digits). |
| **`ls -l` string** | Type a 10-char string like `-rwxr-xr-x` or `drwxrwxrwt`. |
| **Symbolic chmod** | Type an expression and press **Enter** — it is *applied to the current mode*. |

Use the **file / directory** toggle in the header so execute/`X`, the leading
`ls -l` character (`-` vs `d`), and the explanations adapt to context. Toggle
light/dark with the theme button.

### Keyboard (permission grid)

- **←↑↓→** — move focus between cells
- **space** — toggle the focused cell
- **r** / **w** / **x** — toggle that bit in the focused cell's class

### Symbolic chmod cheatsheet

| Clause | Meaning |
|---|---|
| `u+x` | add execute for the owner |
| `go-w` | remove write for group and others |
| `a=rx` | set everyone to exactly read + execute (clears the rest) |
| `u=rwx,g=rx,o=` | absolute per-class assignment |
| `a+X` | add execute **only if** it's a directory or already executable |
| `g+u` | copy the owner's permissions onto the group |
| `+t` | set the sticky bit; `u+s` setuid; `g+s` setgid |

Clauses are comma-separated and applied left to right, exactly like `chmod`.

### Presets

A row of real-world chips seeds common modes: `0644` (regular file), `0755`
(script/dir), `0600` (SSH key), `1777` (`/tmp`), `4755` (setuid binary), `2755`
(setgid dir), `0640` (group-readable config).

### Compare / remediate

Enter a "before" octal mode and Postern computes the **minimal** symbolic
`chmod` that turns it into the current ("after") mode, plus a one-line security
delta (widens exposure / tightens security / no change).

## Self-tests

Postern ships an embedded test matrix (open the "Self-test matrix" panel at the
bottom) asserting the tricky semantics: `ls -l` `s`/`S`/`t`/`T` casing,
conditional `X`, `=` clearing, clause ordering, and minimal-diff output. It runs
on every load and logs the result to the console.

## License

MIT — see [LICENSE](LICENSE).
