-- Run this script in your Supabase SQL Editor to apply the leaderboard RPC function

-- RPC function to get top 10 users with most points
-- Joins users table with form_submission table to get full names

create or replace function get_leaderboard()
returns table (
  user_id uuid,
  full_name text,
  points integer,
  rank integer
) 
language plpgsql
security definer
as $$
begin
  return query
  select 
    u.user_id,
    concat(fs."firstName", ' ', fs."lastName") as full_name,
    u.points,
    row_number() over (order by u.points desc)::integer as rank
  from public.users u
  inner join public.form_submission fs on u.user_id = fs.user_id
  where u.status = 'SUBMITTED'
  order by u.points desc
  limit 10;
end;
$$;

-- Grant execute permission to authenticated users
grant execute on function get_leaderboard() to authenticated;
