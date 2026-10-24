function normalise(value) {
  return String(value).toLowerCase();
}

export function getRoutes(characters) {
  const set = new Set();
  for (const c of characters) {
    if (c.recruitRoute) set.add(c.recruitRoute);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function filterCharacters(characters, filters) {
  const search = normalise(filters.search || '');
  return characters.filter((c) => {
    if (search && !normalise(c.name).includes(search)) return false;
    if (filters.route && filters.route !== 'all' && c.recruitRoute !== filters.route) return false;
    if (filters.tierScore && filters.tierScore !== 'all') {
      const score = String(filters.tierScore);
      if (String(c.tierScore) !== score) return false;
    }
    if (filters.tierLetter && filters.tierLetter !== 'all') {
      if (c.tierLetter !== filters.tierLetter) return false;
    }
    return true;
  });
}

export function sortCharacters(characters, sort) {
  const list = [...characters];
  if (sort === 'name-desc') {
    list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }
  if (sort === 'tier-desc') {
    list.sort((a, b) => {
      if (b.tierScore !== a.tierScore) return b.tierScore - a.tierScore;
      return a.name.localeCompare(b.name);
    });
    return list;
  }
  if (sort === 'tier-asc') {
    list.sort((a, b) => {
      if (a.tierScore !== b.tierScore) return a.tierScore - b.tierScore;
      return a.name.localeCompare(b.name);
    });
    return list;
  }
  list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}
