# Matrix Calculator

A single-file, offline matrix calculator. Compute determinant, inverse, transpose, and multiplication for any-size matrices — exact cofactor expansion, no dependencies.

**Live:** https://awictor.github.io/matrix-calculator/

## Features

- **Determinant** (any square size, cofactor expansion)
- **Inverse** via adjugate ÷ determinant (flags singular matrices)
- **Transpose** and **multiplication** (dimension-checked)
- Paste matrices as rows of space- or comma-separated numbers
- Neatly aligned output; dark mode; 100% offline; zero dependencies

## Tests

```
node tests/selftest.mjs
```

10 checks including A·A⁻¹ = I, det(A·B) = det(A)·det(B), and dimension validation. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
