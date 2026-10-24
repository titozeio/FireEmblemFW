# EPIC1 – Data Pipeline

## Objective

Convert the source Excel workbook `FE_Fortunes_Weave_Character_Classes.xlsx` into the two
JSON datasets consumed by the site, reproducibly and with automated verification.

## User Stories

- **US1.** As a developer, I want a Node script (`scripts/build-data.mjs`) that reads the
  `.xlsx` and generates `data/characters.json` and `data/classes.json`, so I can regenerate
  the data reproducibly.
- **US2.** As a developer, I want the conversion to apply data-fidelity rules (headers,
  empty rows, `—`, notes/sources into `meta.notes`, exclusion of the M-R side list,
  camelCase keys), so the site shows exactly the workbook data.
- **US3.** As a developer, I want a documented `npm run build:data` command, so the
  conversion runs in a single step.

## Scope

- Read the workbook with `exceljs` (dev dependency, already recorded in
  `docs/ARCHITECTURE.md`).
- Emit the two JSON files with the models defined in `docs/ARCHITECTURE.md`.
- Preserve source values verbatim except for whitespace trimming and documented mappings.
- Verify the output manually against the workbook (no automated tests in this epic).

## Out of Scope

- Rendering or UI work (EPIC2 / EPIC3).
- Changes to the workbook content itself.
- Continuous integration configuration.
- Automated tests for the conversion script.
