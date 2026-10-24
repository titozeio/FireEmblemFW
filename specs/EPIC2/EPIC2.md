# EPIC2 – Landing shell + Characters

## Objective

Build the static landing shell and the **Characters** section with search, filters and
sorting, consuming `data/characters.json`.

## User Stories

- **US1.** As a user, I want a static landing (HTML/CSS/JS vanilla) with header, section
  navigation and a clean Fire Emblem-inspired aesthetic, so I can switch between sections.
- **US2.** As a user, I want the Characters section with a free-text search by name, filters
  by Recruit Route, Tier Score and Tier Letter, and sorting by Name and Tier Score, so I can
  find units quickly.
- **US3.** As a user, I want to see all Characters fields (Name, Type, Tier Score, Tier
  Letter, Recruit Route, Initial/Intermediate/Advanced/Master/Divine Class, Role/Notes) in a
  readable table with section notes footer.
- **US4.** As a developer, I want data loading and pure filter/sort/search logic separated
  from rendering, so behavior is easy to reason about and verify.

## Scope

- `index.html`, `css/styles.css`, `js/` modules as defined in `docs/ARCHITECTURE.md`.
- Characters section only in this epic; Classes comes in EPIC3.
- Load `data/characters.json` via `fetch` (relative path for GitHub Pages).
- English UI, semantic HTML, accessible controls.

## Out of Scope

- Classes section (EPIC3).
- Responsive polish for all edge cases (EPIC4).
- Automated tests (project decision; verify manually).
