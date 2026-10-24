import ExcelJS from 'exceljs';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const workbookPath = resolve(root, 'FE_Fortunes_Weave_Character_Classes.xlsx');
const dataDir = resolve(root, 'data');

const trim = (v) => {
  if (v === null || v === undefined) return '—';
  const s = String(v).replace(/\r\n/g, '\n').trim();
  if (s === '') return '—';
  return s;
};

const isEmptyRow = (values) => values.every((v) => trim(v) === '—');

function getCellValue(cell) {
  if (!cell) return null;
  const v = cell.value;
  if (v === null || v === undefined) return null;
  if (typeof v === 'object') {
    if (v.richText) return v.richText.map((rt) => rt.text).join('');
    if (v.result !== undefined) return v.result;
    if (v.text !== undefined) return v.text;
    return null;
  }
  return v;
}

async function readSheet(workbook, name) {
  const ws = workbook.getWorksheet(name);
  if (!ws) throw new Error(`Sheet not found: ${name}`);
  const rows = [];
  ws.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    const values = [];
    for (let c = 1; c <= ws.columnCount; c++) {
      values.push(getCellValue(row.getCell(c)));
    }
    rows.push({ rowNumber, values });
  });
  return { ws, rows };
}

function mapCharacters(rows) {
  const characters = [];
  const notes = [];
  let headerSeen = false;

  for (let i = 0; i < rows.length; i++) {
    const { values } = rows[i];
    if (!headerSeen) {
      if (trim(values[0]).toLowerCase() === 'name') {
        headerSeen = true;
      }
      continue;
    }
    const first = trim(values[0]);
    if (first.toLowerCase().startsWith('notes')) {
      for (let j = i; j < rows.length; j++) {
        const line = trim(rows[j].values.slice(0, 12).join(' | '));
        if (line === '—') continue;
        const cleaned = line.replace(/^notes\s*\/\s*sources\s*\|?\s*/i, '').trim() || line;
        if (cleaned && cleaned !== '—') notes.push(cleaned);
      }
      break;
    }
    if (isEmptyRow(values)) continue;
    const tierScoreRaw = trim(values[2]);
    const tierScore = Number.isNaN(Number(tierScoreRaw)) ? tierScoreRaw : Number(tierScoreRaw);
    characters.push({
      name: trim(values[0]),
      type: trim(values[1]),
      tierScore,
      tierLetter: trim(values[3]),
      recruitRoute: trim(values[4]),
      initialClass: trim(values[5]),
      intermediateClass: trim(values[6]),
      advancedClass: trim(values[7]),
      masterClass: trim(values[8]),
      divineClass: trim(values[9]),
      roleNotes: trim(values[10])
    });
  }
  return { characters, notes };
}

function mapClasses(rows) {
  const classes = [];
  const notes = [];
  let headerSeen = false;

  for (let i = 0; i < rows.length; i++) {
    const { values } = rows[i];
    if (!headerSeen) {
      if (trim(values[0]).toLowerCase() === 'class') {
        headerSeen = true;
      }
      continue;
    }
    const first = trim(values[0]);
    if (first.toLowerCase().startsWith('notes')) {
      for (let j = i; j < rows.length; j++) {
        const line = trim(rows[j].values.slice(0, 12).join(' | '));
        if (line === '—') continue;
        const cleaned = line.replace(/^notes\s*\/\s*sources\s*\|?\s*/i, '').trim() || line;
        if (cleaned && cleaned !== '—') notes.push(cleaned);
      }
      break;
    }
    if (isEmptyRow(values)) continue;
    classes.push({
      name: trim(values[0]),
      type: trim(values[1]),
      minLevel: trim(values[2]),
      renown: trim(values[3]),
      license: trim(values[4]),
      weaponRanksRequired: trim(values[5]),
      weapons: trim(values[6]),
      movement: trim(values[7]),
      classSkills: trim(values[8]),
      masterySkill: trim(values[9]),
      spanishName: trim(values[10]),
      notes: trim(values[11])
    });
  }
  return { classes, notes };
}

async function main() {
  await mkdir(dataDir, { recursive: true });
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);

  const charRes = await readSheet(workbook, 'Characters');
  const { characters, notes: charNotes } = mapCharacters(charRes.rows);

  const classRes = await readSheet(workbook, 'Classes');
  const { classes, notes: classNotes } = mapClasses(classRes.rows);

  const allNotes = [...charNotes, ...classNotes];

  const charactersOut = {
    meta: {
      source: 'FE_Fortunes_Weave_Character_Classes.xlsx',
      generatedAt: new Date().toISOString(),
      notes: allNotes
    },
    characters
  };

  const classesOut = {
    meta: {
      source: 'FE_Fortunes_Weave_Character_Classes.xlsx',
      generatedAt: new Date().toISOString(),
      notes: allNotes
    },
    classes
  };

  await writeFile(resolve(dataDir, 'characters.json'), JSON.stringify(charactersOut, null, 2) + '\n', { encoding: 'utf8' });
  await writeFile(resolve(dataDir, 'classes.json'), JSON.stringify(classesOut, null, 2) + '\n', { encoding: 'utf8' });
  console.log(`Wrote ${characters.length} characters and ${classes.length} classes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
