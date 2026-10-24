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

export function getTypes(classes) {
  const set = new Set();
  for (const c of classes) {
    if (c.type) set.add(c.type);
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

export function filterClasses(classes, filters) {
  const search = normalise(filters.search || '');
  return classes.filter((c) => {
    if (search && !normalise(c.name).includes(search)) return false;
    if (filters.type && filters.type !== 'all' && c.type !== filters.type) return false;
    return true;
  });
}

export function sortClasses(classes, sort) {
  const list = [...classes];
  if (sort === 'type-asc') {
    list.sort((a, b) => {
      const t = (a.type || '').localeCompare(b.type || '');
      if (t !== 0) return t;
      return (a.name || '').localeCompare(b.name || '');
    });
    return list;
  }
  if (sort === 'type-desc') {
    list.sort((a, b) => {
      const t = (b.type || '').localeCompare(a.type || '');
      if (t !== 0) return t;
      return (a.name || '').localeCompare(b.name || '');
    });
    return list;
  }
  if (sort === 'name-desc') {
    list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    return list;
  }
  list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  return list;
}
