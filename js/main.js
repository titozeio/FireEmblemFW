import { loadCharacters, loadClasses, updateCharacter } from './data.js';
import { createCharactersState, createClassesState } from './state.js';
import { filterCharacters, sortCharacters, getRoutes, filterClasses, sortClasses, getTypes } from './logic.js';
import { renderCharacters, renderClasses, renderRouteOptions, renderTypeOptions, renderNotes, renderStatus } from './render.js';

const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

const charSearch = document.getElementById('char-search');
const charRoute = document.getElementById('char-route');
const charTierScore = document.getElementById('char-tier-score');
const charTierLetter = document.getElementById('char-tier-letter');
const charSort = document.getElementById('char-sort');
const charTbody = document.getElementById('char-tbody');
const charStatus = document.getElementById('char-status');
const charEmpty = document.getElementById('char-empty');

const classSearch = document.getElementById('class-search');
const classType = document.getElementById('class-type');
const classSort = document.getElementById('class-sort');
const classTbody = document.getElementById('class-tbody');
const classStatus = document.getElementById('class-status');
const classEmpty = document.getElementById('class-empty');

const charState = createCharactersState();
const classState = createClassesState();

function applyAndRenderCharacters() {
  const filtered = filterCharacters(charState.all, charState.filters);
  const sorted = sortCharacters(filtered, charState.filters.sort);
  const classNames = Array.from(new Set((classState.all || []).map(c => c.name).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  renderCharacters(charTbody, sorted, async (char, updates, el) => {
    try {
      if (charStatus) charStatus.textContent = 'Guardando...';
      await updateCharacter(char.id, updates);
      Object.assign(char, updates);
      if (charStatus) charStatus.textContent = 'Guardado';
      setTimeout(() => {
        if (charStatus) charStatus.textContent = `Mostrando ${sorted.length} de ${charState.all.length} personajes.`;
      }, 800);
      applyAndRenderCharacters();
    } catch (err) {
      console.error(err);
      if (charStatus) charStatus.textContent = 'Error al guardar.';
    }
  }, classNames);
  if (charStatus) charStatus.textContent = `Mostrando ${sorted.length} de ${charState.all.length} personajes.`;
  charEmpty.hidden = sorted.length !== 0;
}

function applyAndRenderClasses() {
  const filtered = filterClasses(classState.all, classState.filters);
  const sorted = sortClasses(filtered, classState.filters.sort);
  renderClasses(classTbody, sorted);
  if (classStatus) classStatus.textContent = `Mostrando ${sorted.length} de ${classState.all.length} clases.`;
  classEmpty.hidden = sorted.length !== 0;
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;
    navButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
    sections.forEach((s) => s.classList.toggle('is-active', s.id === `section-${target}`));
  });
});

if (charSearch) {
  charSearch.addEventListener('input', (e) => {
    charState.filters.search = e.target.value;
    applyAndRenderCharacters();
  });
}
if (charRoute) {
  charRoute.addEventListener('change', (e) => {
    charState.filters.route = e.target.value;
    applyAndRenderCharacters();
  });
}
if (charTierScore) {
  charTierScore.addEventListener('change', (e) => {
    charState.filters.tierScore = e.target.value;
    applyAndRenderCharacters();
  });
}
if (charTierLetter) {
  charTierLetter.addEventListener('change', (e) => {
    charState.filters.tierLetter = e.target.value;
    applyAndRenderCharacters();
  });
}
if (charSort) {
  charSort.addEventListener('change', (e) => {
    charState.filters.sort = e.target.value;
    applyAndRenderCharacters();
  });
}

if (classSearch) {
  classSearch.addEventListener('input', (e) => {
    classState.filters.search = e.target.value;
    applyAndRenderClasses();
  });
}
if (classType) {
  classType.addEventListener('change', (e) => {
    classState.filters.type = e.target.value;
    applyAndRenderClasses();
  });
}
if (classSort) {
  classSort.addEventListener('change', (e) => {
    classState.filters.sort = e.target.value;
    applyAndRenderClasses();
  });
}

loadCharacters()
  .then((data) => {
    charState.all = data.characters || [];
    charState.notes = data.meta?.notes || [];
    charState.routes = getRoutes(charState.all);
    if (charRoute) renderRouteOptions(charRoute, charState.routes, charState.filters.route);
    if (charStatus) charStatus.textContent = 'Cargando personajes...';
    applyAndRenderCharacters();
  })
  .catch((err) => {
    if (charStatus) charStatus.textContent = 'Error al cargar personajes.';
    console.error(err);
  });

loadClasses()
  .then((data) => {
    classState.all = data.classes || [];
    classState.notes = data.meta?.notes || [];
    classState.types = getTypes(classState.all);
    if (classType) renderTypeOptions(classType, classState.types, classState.filters.type);
    applyAndRenderClasses();
  })
  .catch((err) => {
    if (classStatus) classStatus.textContent = 'Error al cargar clases.';
    console.error(err);
  });
