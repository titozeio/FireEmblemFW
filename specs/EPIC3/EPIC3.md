# EPIC3 – Classes

## Objective

Add the **Classes** section with free-text search, filter by type and sorting by
Class and Type, consuming `data/classes.json`.

## User Stories

- **US1.** As a user, I want a Classes section with search by class name, filter by
  Type and sorting by Class and Type, so I can find classes quickly.
- **US2.** As a user, I want to see all Classes fields (Class, Type, Min Level, Renown,
  License, Weapon Ranks Required, Weapons, Movement, Class Skills, Mastery Skill,
  Spanish Name, Notes) in a readable table with section notes footer.
- **US3.** As a developer, I want to extend the existing modules (`data.js`, `logic.js`,
  `render.js`, `state.js`, `main.js`) without duplicating architecture, following the
  same patterns as Characters.

## Scope

- Classes section in `index.html`, styles in `css/styles.css` if needed, JS modules extended.
- Load `data/classes.json` via `fetch` (relative path).
- English UI, semantic HTML, accessible controls.
- Exclude the redundant M-R side list (already excluded in data pipeline).

## Out of Scope

- New frameworks/bundlers.
- Automated tests.
- Final responsive polish (EPIC4).
