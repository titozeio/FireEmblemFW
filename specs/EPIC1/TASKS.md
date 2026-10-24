# EPIC1 – Tasks

## Status

`closed`

## US1: As a developer I want a Node script that reads the workbook and generates the JSON datasets so I can regenerate the data reproducibly

- [x] [T0] [@dev0] Create `package.json` with `"type": "module"`, add `exceljs` as a devDependency and install it.
- [x] [T1] [@dev0] Create `scripts/build-data.mjs` that reads the `Characters` sheet and writes `data/characters.json` using the agreed model.
- [x] [T2] [@dev0] Extend `scripts/build-data.mjs` to read the `Classes` sheet and write `data/classes.json`.

## US2: As a developer I want the conversion to apply data-fidelity rules so the site shows exactly the workbook data

- [x] [T3] [@dev0] Normalise output: skip headers and empty rows, preserve `—`, move notes/sources to `meta.notes`, exclude columns M-R, camelCase keys and numeric `tierScore`.

## US3: As a developer I want a documented `npm run build:data` command so the conversion runs in a single step

- [x] [T4] [@dev0] Add the `build:data` script to `package.json`, document its usage in `docs/ARCHITECTURE.md`, run it and verify the generated JSON against the workbook.
