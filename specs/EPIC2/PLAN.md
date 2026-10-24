# EPIC2 – Plan

## Status

`closed`

## User Story Order

1. **US1 – Shell:** `index.html` with header/nav/sections, `css/styles.css` with Fire Emblem-inspired palette/typography and mobile-first base.
2. **US4 – Modules + logic:** `js/data.js`, `js/state.js`, `js/logic.js`, `js/render.js`, `js/main.js` with pure filter/sort/search for characters.
3. **US2 – Characters controls:** filters by Recruit Route, Tier Score, Tier Letter; sort by Name/Tier Score; free-text search by name.
4. **US3 – Characters table:** render all columns, empty state, `aria-live` status, section notes footer.

## Dependencies

- US4 depends on US1.
- US2 depends on US4.
- US3 depends on US2.

## Verification

- Manual: test in browser, especially phone landscape (iPhone 16), keyboard navigation and focus states.
- Data comes from `data/characters.json`.

## Open Questions

- None.

## PM Approval

- Approved by the PM on 2026-10-24.
