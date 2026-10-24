import { supabase } from './supabase-client.js';

export async function loadCharacters() {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return { characters: data || [], meta: { notes: [] } };
}

export async function loadClasses() {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return { classes: data || [], meta: { notes: [] } };
}

export async function updateCharacter(id, updates) {
  const { data, error } = await supabase
    .from('characters')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateClass(id, updates) {
  const { data, error } = await supabase
    .from('classes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
