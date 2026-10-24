function tierFromScore(score) {
  const s = Number(score);
  if (s === 5) return 'S';
  if (s === 4) return 'A';
  if (s === 3) return 'B';
  if (s === 2) return 'C';
  if (s === 1) return 'D';
  return '';
}

function cell(value) {
  const td = document.createElement('td');
  td.textContent = value === '' || value === null || value === undefined ? '—' : value;
  td.title = td.textContent;
  return td;
}

function cellNotes(value) {
  const td = document.createElement('td');
  const span = document.createElement('span');
  const text = value === '' || value === null || value === undefined ? '—' : value;
  span.textContent = text === '—' ? '—' : text.length > 60 ? text.slice(0, 57) + '...' : text;
  span.title = text;
  span.className = 'notes-trunc';
  td.appendChild(span);
  return td;
}

function cellSelect(value, options) {
  const td = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'cell-select';
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = opt.value;
    o.textContent = opt.label;
    if (opt.value === value) o.selected = true;
    select.appendChild(o);
  }
  td.appendChild(select);
  return { td, select };
}

export function renderRouteOptions(select, routes, current) {
  select.innerHTML = '';
  const all = document.createElement('option');
  all.value = 'all';
  all.textContent = 'All';
  select.appendChild(all);
  for (const route of routes) {
    const opt = document.createElement('option');
    opt.value = route;
    opt.textContent = route;
    select.appendChild(opt);
  }
  select.value = current;
}

export function renderTypeOptions(select, types, current) {
  select.innerHTML = '';
  const all = document.createElement('option');
  all.value = 'all';
  all.textContent = 'All types';
  select.appendChild(all);
  for (const type of types) {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    select.appendChild(opt);
  }
  select.value = current;
}

export function renderCharacters(tbody, list, onChange, classOptions = []) {
  tbody.innerHTML = '';
  const classOpts = ['—', ...classOptions.filter((v) => v && v !== '—')];
  for (const c of list) {
    const tr = document.createElement('tr');
    tr.dataset.id = c.id;

    // Name (display only)
    tr.appendChild(cell(c.name));

    // Tier Score (numeric stepper)
    const scoreWrap = document.createElement('td');
    const scoreInput = document.createElement('input');
    scoreInput.type = 'number';
    scoreInput.min = '1';
    scoreInput.max = '5';
    scoreInput.step = '1';
    scoreInput.value = c.tierScore ?? '';
    scoreInput.className = 'cell-input';
    scoreWrap.appendChild(scoreInput);
    tr.appendChild(scoreWrap);
    scoreInput.addEventListener('change', async () => {
      const score = scoreInput.value === '' ? null : Number(scoreInput.value);
      const letter = score === null ? null : tierFromScore(score);
      await onChange?.(c, { tierScore: score, tierLetter: letter }, scoreInput);
    });

    // Tier Letter (auto, display)
    tr.appendChild(cell(c.tierLetter));

    // Recruit Route (select)
    const routeWrap = document.createElement('td');
    const routeSelect = document.createElement('select');
    routeSelect.className = 'cell-select';
    const routeOpts = ['All', 'Dietrich', 'Kai', 'Leda', 'Theodore'];
    for (const r of routeOpts) {
      const o = document.createElement('option');
      o.value = r;
      o.textContent = r;
      if ((c.recruitRoute || '') === r) o.selected = true;
      routeSelect.appendChild(o);
    }
    routeWrap.appendChild(routeSelect);
    tr.appendChild(routeWrap);
    routeSelect.addEventListener('change', async () => {
      await onChange?.(c, { recruitRoute: routeSelect.value }, routeSelect);
    });

    // Classes 1-5 (dropdowns)
    const classFields = ['initialClass', 'intermediateClass', 'advancedClass', 'masterClass', 'divineClass'];
    for (const field of classFields) {
      const td = document.createElement('td');
      const sel = document.createElement('select');
      sel.className = 'cell-select';
      for (const optv of classOpts) {
        const o = document.createElement('option');
        o.value = optv === '—' ? '' : optv;
        o.textContent = optv;
        if ((c[field] || '') === o.value) o.selected = true;
        sel.appendChild(o);
      }
      td.appendChild(sel);
      tr.appendChild(td);
      sel.addEventListener('change', async () => {
        await onChange?.(c, { [field]: sel.value || null }, sel);
      });
    }

    // Notes (non-editable, truncated with tooltip)
    tr.appendChild(cellNotes(c.roleNotes));

    tbody.appendChild(tr);
  }
}

export function renderClasses(tbody, list) {
  tbody.innerHTML = '';
  for (const c of list) {
    const tr = document.createElement('tr');
    tr.appendChild(cell(c.name));
    tr.appendChild(cell(c.type));
    tr.appendChild(cell(c.minLevel));
    tr.appendChild(cell(c.renown));
    tr.appendChild(cell(c.license));
    tr.appendChild(cell(c.weaponRanksRequired));
    tr.appendChild(cell(c.weapons));
    tr.appendChild(cell(c.movement));
    tr.appendChild(cell(c.classSkills));
    tr.appendChild(cell(c.masterySkill));
    tr.appendChild(cell(c.spanishName));
    tr.appendChild(cell(c.notes));
    tbody.appendChild(tr);
  }
}

export function renderNotes(listEl, notes) {
  listEl.innerHTML = '';
  for (const n of notes) {
    const li = document.createElement('li');
    li.textContent = n;
    listEl.appendChild(li);
  }
}

export function renderStatus(el, total, shown, label) {
  el.textContent = `Showing ${shown} of ${total} ${label}.`;
}
