function cell(value) {
  const td = document.createElement('td');
  td.textContent = value === '' || value === null || value === undefined ? '—' : value;
  return td;
}

export function renderRouteOptions(select, routes, current) {
  select.innerHTML = '';
  const all = document.createElement('option');
  all.value = 'all';
  all.textContent = 'All routes';
  select.appendChild(all);
  for (const route of routes) {
    const opt = document.createElement('option');
    opt.value = route;
    opt.textContent = route;
    select.appendChild(opt);
  }
  select.value = current;
}

export function renderCharacters(tbody, list) {
  tbody.innerHTML = '';
  for (const c of list) {
    const tr = document.createElement('tr');
    tr.appendChild(cell(c.name));
    tr.appendChild(cell(c.type));
    tr.appendChild(cell(c.tierScore));
    tr.appendChild(cell(c.tierLetter));
    tr.appendChild(cell(c.recruitRoute));
    tr.appendChild(cell(c.initialClass));
    tr.appendChild(cell(c.intermediateClass));
    tr.appendChild(cell(c.advancedClass));
    tr.appendChild(cell(c.masterClass));
    tr.appendChild(cell(c.divineClass));
    tr.appendChild(cell(c.roleNotes));
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

export function renderStatus(el, total, shown) {
  el.textContent = `Showing ${shown} of ${total} characters.`;
}
