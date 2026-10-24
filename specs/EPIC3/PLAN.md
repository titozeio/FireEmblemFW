# EPIC3 – Plan

## Status

`closed`

## User Story Order

1. **US3 – Extend modules:** update `js/data.js`, `js/state.js`, `js/logic.js`, `js/render.js`, `js/main.js` to support classes.
2. **US1 – Controls:** add search by class name, filter by Type, sort by Class and Type.
3. **US2 – Table + notes:** render all columns, empty state, `aria-live` status, notes footer.

## Dependencies

- US1 depends on US3.
- US2 depends on US1.

## Verification

- Manual check against `data/classes.json` and the Classes sheet (exclude M-R list).
- Keyboard navigation and accessible controls.

## Open Questions

- None.

## PM Approval

- Approved by the PM on 2026-10-24.
