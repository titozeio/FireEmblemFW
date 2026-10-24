-- EPIC6: Supabase schema for characters and classes
-- Run this in Supabase SQL editor

create extension if not exists pgcrypto;

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  name text unique,
  type text,
  "tierScore" integer,
  "tierLetter" text,
  "recruitRoute" text,
  "initialClass" text,
  "intermediateClass" text,
  "advancedClass" text,
  "masterClass" text,
  "divineClass" text,
  "roleNotes" text,
  portrait text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text unique,
  type text,
  "minLevel" text,
  renown text,
  license text,
  "weaponRanksRequired" text,
  weapons text,
  movement text,
  "classSkills" text,
  "masterySkill" text,
  "spanishName" text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_characters_updated_at on public.characters;
create trigger set_characters_updated_at
before update on public.characters
for each row execute procedure public.set_updated_at();

drop trigger if exists set_classes_updated_at on public.classes;
create trigger set_classes_updated_at
before update on public.classes
for each row execute procedure public.set_updated_at();

alter table public.characters enable row level security;
alter table public.classes enable row level security;

-- Allow anon to read and update (as agreed)
drop policy if exists "anon_select_characters" on public.characters;
create policy "anon_select_characters" on public.characters for select using (true);

drop policy if exists "anon_update_characters" on public.characters;
create policy "anon_update_characters" on public.characters for update using (true) with check (true);

drop policy if exists "anon_select_classes" on public.classes;
create policy "anon_select_classes" on public.classes for select using (true);

drop policy if exists "anon_update_classes" on public.classes;
create policy "anon_update_classes" on public.classes for update using (true) with check (true);
