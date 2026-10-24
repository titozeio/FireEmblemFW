export function createCharactersState() {
  return {
    all: [],
    notes: [],
    filters: {
      search: '',
      route: 'all',
      tierScore: 'all',
      tierLetter: 'all',
      sort: 'name-asc'
    },
    routes: []
  };
}

export function createClassesState() {
  return {
    all: [],
    notes: [],
    filters: {
      search: '',
      type: 'all',
      sort: 'name-asc'
    },
    types: []
  };
}
