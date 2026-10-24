import { loadCharacters } from './data.js';
import { createCharactersState } from './state.js';
import { filterCharacters, sortCharacters, getRoutes } from './logic.js';
import { renderCharacters, renderRouteOptions, renderNotes, renderStatus } from './render.js';

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
const charNotesList = document.getElementById('char-notes-list');

const state = createCharactersState();

function applyAndRender() {
  const filtered = filterCharacters(state.all, state.filters);
  const sorted = sortCharacters(filtered, state.filters.sort);
  renderCharacters(charTbody, sorted);
  renderStatus(charStatus, state.all.length, sorted.length);
  charEmpty.hidden = sorted.length !== 0;
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;
    navButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
    sections.forEach((s) => s.classList.toggle('is-active', s.id === `section-${target}`));
  });
});

charSearch.addEventListener('input', (e) => {
  state.filters.search = e.target.value;
  applyAndRender();
});

charRoute.addEventListener('change', (e) => {
  state.filters.route = e.target.value;
  applyAndRender();
});

charTierScore.addEventListener('change', (e) => {
  state.filters.tierScore = e.target.value;
  applyAndRender();
});

charTierLetter.addEventListener('change', (e) => {
  state.filters.tierLetter = e.target.value;
  applyAndRender();
});

charSort.addEventListener('change', (e) => {
  state.filters.sort = e.target.value;
  applyAndRender();
});

loadCharacters()
  .then((data) => {
    state.all = data.characters || [];
    state.notes = data.meta?.notes || [];
    state.routes = getRoutes(state.all);
    renderRouteOptions(charRoute, state.routes, state.filters.route);
    renderNotes(charNotesList, state.notes);
    applyAndRender();
  })
  .catch((err) => {
    charStatus.textContent = 'Failed to load character data.';
    console.error(err);
  });
