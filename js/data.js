export async function loadCharacters() {
  const response = await fetch('./data/characters.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load characters.json: ${response.status}`);
  }
  const json = await response.json();
  return json;
}

export async function loadClasses() {
  const response = await fetch('./data/classes.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load classes.json: ${response.status}`);
  }
  const json = await response.json();
  return json;
}
