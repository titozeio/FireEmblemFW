# ROADMAP

Status legend:

- `new`
- `spec`
- `plan`
- `tasks`
- `implement`
- `review`
- `done`

| ID    | Name               | Objective                                                                                                                                                              | Status    | Finished |
| ----- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| EPIC0 | First product epic | Create the basic foundation of the project: agents constitution, initial specs, architecture and initial roadmap so the project can start normal SDD Sprint execution. | done      | 2026-10-24 |
| EPIC1 | Data pipeline      | Convert the source Excel workbook into the `characters.json` and `classes.json` datasets consumed by the site, with a reproducible Node script and a documented command. | done      | 2026-10-24 |
| EPIC2 | Landing shell + Characters | Build the static landing shell (HTML/CSS/JS, Fire Emblem-inspired look) and the Characters section with search, filters (route, score, letter) and sorting.     | implement |          |
| EPIC3 | Classes            | Add the Classes section with search, filter by type and sorting by class and type.                                                                                     | new       |          |
| EPIC4 | Responsive, accessibility and deployment | Harden the mobile-first landscape layout (iPhone 16), run the accessibility pass, verify manually and publish the site to GitHub Pages.                        | new       |          |

## Dependencies

- EPIC1 has no dependencies.
- EPIC2 depends on EPIC1 (data).
- EPIC3 depends on EPIC1 (data) and EPIC2 (shared shell).
- EPIC4 depends on EPIC2 and EPIC3.

## Notes

- `EPIC0` is the default epic for each SDD project needed to start normal SDD.
- Each epic should live in `specs/EPICX/` with its own focused docs.
- `EPIC0` ships scaffolded and starts in `implement`.
- Keep roadmap entries short and actionable.
