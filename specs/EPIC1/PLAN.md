# EPIC1 – Plan

## Status

`closed`

## User Story Order

1. **US1 – Script base:** create `scripts/build-data.mjs`, read both sheets with `exceljs`
   and emit `data/characters.json` and `data/classes.json` using the models in
   `docs/ARCHITECTURE.md`.
2. **US2 – Fidelity rules:** handle headers, empty rows, literal `—`, `meta.notes`,
   exclude the M-R side list, camelCase keys and numeric `tierScore`.
3. **US3 – Command and docs:** add `package.json` (`"type": "module"`, `build:data`) and a
   usage note in `docs/ARCHITECTURE.md`.

## Dependencies

- US2 depends on US1.
- US3 depends on US1.

## Verification

- Manual comparison of the generated JSON against the workbook.
- No automated tests in this epic (PM decision).

## Open Questions

- None.

## PM Approval

- Approved by the PM on 2026-10-24.
