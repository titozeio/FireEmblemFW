# EPIC2 – Tasks

## Status

`closed`

## US1: As a user I want a static landing shell so I can switch between sections

- [<] [T0] [@dev0] Create `index.html` with header, section nav, `Characters` and placeholder `Classes` sections.
- [<] [T1] [@dev0] Add `css/styles.css` with Fire Emblem-inspired palette/typography, mobile-first base styles.

## US4: As a developer I want modules and pure logic separated from rendering

- [-] [T2] [@dev0] Create `js/data.js` to load `data/characters.json` via fetch.
- [<] [T3] [@dev0] Create `js/state.js`, `js/logic.js` (pure filter/sort/search for characters), `js/render.js` and `js/main.js` wiring.

## US2: As a user I want search, filters and sorting for Characters

- [<] [T4] [@dev0] Add controls for name search, Recruit Route, Tier Score, Tier Letter and sort (Name/Tier Score) in the Characters section.

## US3: As a user I want a readable Characters table with all fields and notes

- [<] [T5] [@dev0] Render Characters table with all columns, empty state, `aria-live` results count and section notes footer.
