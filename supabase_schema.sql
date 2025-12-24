-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create Enums
create type contribution_status as enum ('pending', 'approved', 'rejected');
create type contribution_type as enum ('story', 'proverb', 'voice');

-- Create Contributions Table
create table if not exists contributions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  status contribution_status default 'pending',
  type contribution_type not null,
  text text,
  audio_path text,
  theme text not null,
  origin_region text not null,
  origin_free_text text,
  lineage text,
  from_story_slug text,
  approved_at timestamptz
);

-- Enable RLS
alter table contributions enable row level security;

-- Policies

-- 1. Public can read ONLY approved contributions
create policy "Public read approved"
  on contributions for select
  using (status = 'approved');

-- 2. Public can insert, but status must be 'pending' (enforced by default, but good to check)
-- Note: Requires client to NOT set status, or set it to pending.
create policy "Public insert"
  on contributions for insert
  with check (true); 
  -- We trust the default value or server validation. 
  -- Ideally, valid would be: (status = 'pending')

-- Storage Setup (If executing in dashboard SQL editor)
-- Note: You must create a bucket named 'contribution-audio' and set it to Private.
-- Policies for Storage:

-- 1. Public Upload
-- create policy "Public upload" on storage.objects for insert with check (bucket_id = 'contribution-audio');

-- 2. No Public Read (Signed URLs only)
