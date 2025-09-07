-- Extensions (for UUID generation)
create extension if not exists pgcrypto;

-- Enum for user status
do $$
begin
  if not exists (select 1 from pg_type where typname = 'submission_status') then
    create type submission_status as enum ('NOT_SUBMITTED', 'SUBMITTED');
  end if;
end $$;

-- Function to generate unique random referral code
create or replace function generate_referral_code()
returns text as $$
declare
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
  attempts integer := 0;
  max_attempts integer := 100;
begin
  loop
    result := '';
    for i in 1..6 loop
      result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    end loop;
    
    -- Check if this code already exists
    if not exists (select 1 from users where "code" = result) then
      return result;
    end if;
    
    attempts := attempts + 1;
    if attempts >= max_attempts then
      -- If we can't generate a unique code after max_attempts, throw an error
      raise exception 'Unable to generate unique referral code after % attempts', max_attempts;
    end if;
  end loop;
end;
$$ language plpgsql;

-- USERS TABLE
create table if not exists public.users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  status submission_status not null default 'NOT_SUBMITTED',
  "code" text unique default generate_referral_code(),
  points integer not null default 0,
  created_at timestamptz not null default now()
);

-- Uniqueness for email (case-insensitive)
create unique index if not exists users_email_unique_idx on public.users (lower(email));

-- Unique index for referral code
create unique index if not exists users_referral_code_unique_idx on public.users ("code");

-- Enable RLS for users
alter table public.users enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'users' and policyname = 'users_select_own'
  ) then
    create policy users_select_own on public.users
      for select using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'users' and policyname = 'users_insert_self'
  ) then
    create policy users_insert_self on public.users
      for insert with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'users' and policyname = 'users_update_own'
  ) then
    create policy users_update_own on public.users
      for update using (auth.uid() = user_id);
  end if;
end $$;

-- Enum for selected path
do $$
begin
  if not exists (select 1 from pg_type where typname = 'selected_path') then
    create type selected_path as enum ('software', 'hardware', 'uiux');
  end if;
end $$;

-- FORM_SUBMISSION TABLE
-- Column names intentionally match the app's JSON keys (camelCase) exactly.
create table if not exists public.form_submission (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  
  -- Data diri
  "firstName" text not null,
  "lastName" text not null,
  email text not null,
  "noTelp" text not null,
  "idLine" text not null,
  department text not null,
  major text not null,
  npm text not null,
  "selectedPath" selected_path not null,
  
  -- Kode Referral (Optional)
  "referralCode" text,
  
  -- Upload dokumen
  "cvAtsUrl" text not null,
  "essayMotletUrl" text not null,
  "twibbonUrl" text not null,
  
  created_at timestamptz not null default now(),
  unique (user_id)
);

create index if not exists form_submission_user_id_idx on public.form_submission (user_id);

-- Enable RLS for form_submission
alter table public.form_submission enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'form_submission' and policyname = 'form_submission_select_own'
  ) then
    create policy form_submission_select_own on public.form_submission
      for select using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'form_submission' and policyname = 'form_submission_insert_self'
  ) then
    create policy form_submission_insert_self on public.form_submission
      for insert with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'form_submission' and policyname = 'form_submission_update_own'
  ) then
    create policy form_submission_update_own on public.form_submission
      for update using (auth.uid() = user_id);
  end if;
end $$;


